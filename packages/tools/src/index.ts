import path from "node:path";

import { parseEnv, Schemas, RestrictSchemas } from "znv";

export function processEnv<const T extends Schemas>(schema: T & RestrictSchemas<T>) {
  return parseEnv<T>(process.env, schema);
}
