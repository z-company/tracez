import { Stats } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { CreateKeyResponse } from "pages/api/key";
import { TraceResponse } from "pages/api/trace";
import { useMemo, useState } from "react";
import create from "zustand";
import { combine } from "zustand/middleware";

export type ApiCall = {path: string, data?: any};
export type ApiProcess = "idle" | "pending" | "failed";

export const callApi = <T, >({path, data}: ApiCall) => {
  const url = `${location.origin}/api/${path}`;
  if (!data)
    return axios.get<unknown, AxiosResponse<T, unknown>>(url);
  return axios.post<unknown, AxiosResponse<T, unknown>>(url, data);
};

export type ApiStatus = {
  error: any,
  status: ApiProcess,
  lastFetched: number,
  code: number
}

export const createApi= <T, >(call: ApiCall, interval = 5*1000*60) => {
  const useStore = create(
    combine({
      data: null,
      error: null,
      status: "idle",
      lastFetched: 0,
      code: 0,
    } as ApiStatus & { data: T | null}, set => ({
      fetchData: async () => {
        try {
          set(s => ({ ...s, status: "pending" }));
          const response = await callApi<T>(call);
          useStore.setState({
            data: response.data,
            error: null,
            status: "idle",
            lastFetched: Date.now(),
            code: response.status,
          });
        } catch (exception: any) {
          set(s => ({ ...s, status: "failed", error: exception }));
        }
      }
    }))
  );

  if (interval > 0) {
    useStore.getState().fetchData();
    setInterval(() => useStore.getState().fetchData(), interval);
  }

  return useStore;
};

export const useApi = <T, >({path, data}: ApiCall) => {
  const memCall = useMemo(() => ({ path, data }), [path, data]);
  const [status, setStatus] = useState({
    state: null,
    error: null,
    status: "idle",
    lastFetched: 0,
    code: 0,
  } as ApiStatus & { state: T|null });
  const fetch = async () => {
    try {
      setStatus(s => ({ ...s, status: "pending" }));
      const response = await callApi<T>(memCall);
      setStatus({
        state: response.data,
        error: null,
        status: "idle",
        lastFetched: Date.now(),
        code: response.status,
      });
    } catch (exception: any) {
      setStatus(s => ({ ...s, status: "failed", error: exception }));
    }
  };
  return [status.state, fetch, status] as [T|null, ()=>Promise<void>, ApiStatus];
};

export const useFetchNewKey = () => useApi<CreateKeyResponse>({path: "key"});

export const useTraces = createApi<TraceResponse[]>({path: "trace"}, 30*1000);

export const useStats = (id: string) => useApi<Stats[]>({path: "trace/stats", data: {trace: id}});