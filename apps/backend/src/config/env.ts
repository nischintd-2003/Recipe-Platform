import * as z from "zod";
import dotenv from "dotenv";

dotenv.config();

const ENVSchema = z.object({
  PORT: z.coerce.number().default(8000),
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
