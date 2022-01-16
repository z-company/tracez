import { Trace } from "@prisma/client";
import { withApplicationKey } from "middleware/api/auth";
import { withSchema } from "middleware/api/schema";
import { pushTrace } from "store/traces";
import { Schema } from "utils/validate";

const schema: Schema = {
  application: "string",
  event: "string",
  trace: "string",
};

export default withSchema(schema, withApplicationKey(async (req, res, user) => {
  await pushTrace({ ...req.body, userId: user.id } as Trace);
  res.status(201);
  res.json({ code: 201, message: "Created" });
}));