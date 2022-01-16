import axios, { AxiosResponse } from "axios";
import { CreateKeyResponse } from "pages/api/key";
import { TraceResponse } from "pages/api/trace";
import { useEffect, useMemo, useState } from "react";

export type ApiCall = {path: string, data?: any};
export type ApiProcess = "idle" | "pending" | "failed";

export const callApi = <T, >({path, data}: ApiCall) => {
  const url = `${location.origin}/api/${path}`;
  if (!data)
    return axios.get<any, AxiosResponse<T, any>>(url);
  return axios.post<any, AxiosResponse<T, any>>(url, data);
};

export type ApiStatus = {
  error: any,
  status: ApiProcess,
  lastFetched: number
}

export const useApi = <T, >({path, data}: ApiCall) => {
  const memCall = useMemo(() => ({ path, data }), [path, data]);
  const [state, setState] = useState<T|null>(null);
  const [fetch, refetch] = useState(0);
  const [lastFetched, setLastFetched] = useState(0);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState<ApiProcess>("idle");
  useEffect(() => {
    if (fetch !== 0)
      (async () => {
        try {
          setStatus("pending");
          setState(await (await callApi<T>(memCall)).data);
          setError(null);
          setStatus("idle");
          setLastFetched(Date.now());
        } catch (exception: any) {
          setError(exception);
          setStatus("failed");
        }
      })();
  }, [fetch, memCall]);
  return [state, () => refetch(n => n+1), {
    error,
    status,
    lastFetched
  }] as [T|null, ()=>void, ApiStatus];
};

export const useFetchNewKey = () => useApi<CreateKeyResponse>({path: "key"});

export const useFetchTraces = () => useApi<TraceResponse[]>({path: "trace"});