import { withSession } from "middleware/api/auth";
import { withSchema } from "middleware/api/schema";
import { getStats } from "store/traces";
import { stringify } from "utils/json";
import { Schema } from "utils/validate";

const schema: Schema = {
  trace: "string",
};

export default withSchema(schema, withSession(async (req, res, session) => {
  const stats = await getStats(session.user.id, req.body.trace as string);
  res.status(200);
  res.setHeader("Content-Type", "application/json");
  res.send(stringify(stats));
}));