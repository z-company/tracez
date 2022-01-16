import { Stats, Trace } from "@prisma/client";
import { withSession } from "middleware/api/auth";
import { getTraces } from "store/traces";

export type TraceResponse = Trace & {
  Stats: Stats[];
};

export default withSession(async (req, res, session) => {
  const traces = await getTraces(session.user.id);
  res.status(200);
  res.json(traces
    .map(trace => ({
      ...trace, Stats: trace.Stats
        .map(stat => ({
          ...stat,
          bucket: parseInt(stat.bucket + ""),
          unit: parseInt(stat.unit + ""),
        }))
    })));
  return;
});