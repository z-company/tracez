import { randomBytes } from "crypto";
import store from "./store";

const key = () => randomBytes(32).toString("base64").replace("=", "");

export const generateApiKey = (userId: string) =>
  store.apiKey.upsert({
    create: {
      userId,
      key: key(),
    },
    update: {
      userId,
      key: key(),
    },
    where: {
      userId,
    }
  });
export const getApiKey = (key: string) =>
  store.apiKey.findFirst({
    where: {
      key,
    },
    include: {
      user: true,
    }
  });