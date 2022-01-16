import { Schema, validateSchema } from "./validate";

test("simple schema", () => {
  expect(validateSchema({
    string: "this is a test",
    number: 123,
    boolean: true,
  }, {
    string: "string",
    number: "number",
    boolean: "boolean",
  })).toBe(true);
});

test("nested schema", () => {
  const t = {
    obj: {
      string: "this is a test",
      number: 123,
      boolean: true,
    }
  };

  const v = {
    obj: {
      string: "string",
      number: "number",
      boolean: "boolean",
    }
  } as Schema;
  expect(validateSchema(t, v)).toBe(true);
  expect(validateSchema({ obj: { string: "asd" } }, v)).toBe(false);
});

test("array schema", () => {
  const t = {
    obj: [{
      string: "this is a test",
      number: 123,
      boolean: true,
    }]
  };

  const v = {
    obj: [{
      string: "string",
      number: "number",
      boolean: "boolean",
    }]
  } as Schema;
  expect(validateSchema(t, v)).toBe(true);
  expect(validateSchema({ obj: [{ string: "asd" }] }, v)).toBe(false);
});