import * as z from "zod";
import dotenv from "dotenv";

dotenv.config();

const ENVSchema = z.object({
  PORT: z.coerce.number().default(8000),
  DB_HOST: z.string().default("localhost"),
  DB_PORT: z.coerce.number().default(3306),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
});

const parsedEnv = ENVSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    " Invalid environment variables",
    z.flattenError(parsedEnv.error),
  );
  process.exit(1);
}

export const env = parsedEnv.data;
