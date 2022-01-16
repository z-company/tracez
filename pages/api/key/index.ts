import { withSession } from "middleware/api/auth";
import { withSchema } from "middleware/api/schema";
import { generateApiKey } from "store/key";

export type CreateKeyResponse = {
  key: string
};

export default withSchema({}, withSession(async (req, res, session) => {
  const { key } = await generateApiKey(session.user.id);
  res.status(201);
  return res.json({ key });
}));