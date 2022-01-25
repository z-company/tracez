import { withSession } from "middleware/api/auth";
import { withSchema } from "middleware/api/schema";
import { deleteTrace } from "store/traces";
import { Schema } from "utils/validate";

const schema: Schema = { 
  trace: "string"
};

export default withSchema(schema, withSession(async (req, res, session) => {
  await deleteTrace(req.body.trace as string, session.user.id);
  res.status(200);
  res.json({code: 200, message: "Ok"});
}));