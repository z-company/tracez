import { NextApiRequest, NextApiResponse } from "next";
import { Session, User } from "next-auth";
import { getSession } from "next-auth/react";
import { getApiKey } from "store/key";

export type withHandler<T> = (
  req: NextApiRequest,
  res: NextApiResponse,
  extra: T
) => void | Promise<void>;

const unauthorized = { code: 401, message: "Unauthorized" };
const deauthorize = (res: NextApiResponse) => {
  res.status(401);
  res.json(unauthorized);
};

export const withSession = (next: withHandler<Session>) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session)
      return deauthorize(res);
    return await next(req, res, session);
  };

export const withApplicationKey = (next: withHandler<User>) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const authorization = req.headers["authorization"];
    if (!authorization || authorization.indexOf("Token") === -1)
      return deauthorize(res);

    const tokens = authorization.split(" ");
    if (tokens.length === 1)
      return deauthorize(res);

    const token = tokens[1];
    const result = await getApiKey(token);
    if (result === null)
      return deauthorize(res);
    return await next(req, res, result.user);
  };