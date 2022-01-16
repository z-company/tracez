/* eslint-disable camelcase */
import { Trace, User } from "@prisma/client";
import store from "./store";
import { QuarterMinute, Minute, Hour, Day, Month, Year } from "./units";

const seedDate = 1642344797024;

const unitOrder = [QuarterMinute, Minute, Hour, Day, Month, Year];

const getBucket = (unit: number) =>
  ((Date.now() - seedDate) / unit) | 0;

const generatePushes = (trace: Trace) => {
  const now = Date.now() - seedDate;
  return unitOrder
    .map(n => [n, (now / n) | 0])
    .map(([unit, bucket]) => store.stats.upsert({
      create: {
        bucket,
        unit,
        hits: 1,
        traceId: trace.id,
      },
      update: {
        hits: {
          increment: 1
        }
      },
      where: {
        bucket_unit_traceId: { bucket, unit, traceId: trace.id }
      }
    }));
};

export const pushTrace = async (trace: Trace) => {
  const { application, event } = trace;
  const upsert = await store.trace.upsert({
    create: {
      ...trace,
    },
    update: {},
    where: {
      application_event_trace: {
        application,
        event,
        trace: trace.trace,
      }
    }
  });
  trace.id = upsert.id;

  return store.$transaction(generatePushes(trace));
};

export const getTraces = async (userId: string) => {
  return await store.trace.findMany({
    where: {
      user: {
        id: userId
      }
    },
    include: {
      Stats: {
        where: {
          OR: unitOrder.map(n => ({
            unit: n,
            bucket: getBucket(n),
          }))
        }
      }
    }
  });
};