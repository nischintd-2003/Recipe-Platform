import * as z from "zod";
import { MESSAGES, VALIDATION } from "../config/constants";

export const loginSchema = z.object({
  email: z.email({ error: MESSAGES.VALIDATION.INVALID_EMAIL }),
  password: z.string().min(VALIDATION.AUTH.PASSWORD_MIN_LEN, {
    error: MESSAGES.VALIDATION.PASSWORD_SHORT,
  }),
});

export const signupSchema = loginSchema.extend({
  username: z.string().min(VALIDATION.AUTH.USERNAME_MIN_LEN, {
    error: MESSAGES.VALIDATION.USERNAME_SHORT,
  }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
