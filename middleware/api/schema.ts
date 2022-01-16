import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Schema, validateSchema } from "utils/validate";

export const withSchema = (schema: Schema, next: NextApiHandler): NextApiHandler =>
  (req: NextApiRequest, res: NextApiResponse) => {
    if (!validateSchema(req.body, schema)) {
      res.status(400);
      res.send({ code: 400, message: "Bad Request", schema });
      return;
    }
    return next(req, res);
  };