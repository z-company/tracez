import { Stats, Trace } from "@prisma/client";
import { withSession } from "middleware/api/auth";
import { getTraces } from "store/traces";
import { stringify } from "utils/json";

export type TraceResponse = Trace & {
  Stats: Stats[];
};

export default withSession(async (req, res, session) => {
  const traces = await getTraces(session.user.id);
  res.status(200);
  res.setHeader("Content-Type", "application/json");
  res.send(stringify(traces));
});