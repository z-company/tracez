export type Schema = {
  [key: string]: "string" | "number" | "bigint" | "boolean" | Schema[] | Schema,
}

export const validateSchema = (obj: any, schema: Schema): boolean => {
  if (typeof obj === "undefined")
    return false;
  if (typeof schema !== "object")
    return schema === typeof obj;
  if (Array.isArray(schema))
    return Array.isArray(obj)
      ? obj.every(v => validateSchema(v, schema[0]))
      : false;
  return Object.keys(schema).length === Object.keys(obj).length
    && Object
      .entries(schema)
      .every(([key, type]) => validateSchema(obj[key], type as Schema));
};

export const onInvalid = (obj: any, schema: Schema, then: () => void) => {
  if (!validateSchema(obj, schema))
    then();
};