export const stringify = (data: any) => JSON.stringify(data,
  (_, value) => typeof value === "bigint" ? parseInt(value+"") : value);