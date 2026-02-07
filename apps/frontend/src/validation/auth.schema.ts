import * as z from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters" }),
});

export const signupSchema = loginSchema.extend({
  username: z.string().min(2, { error: "Name is required" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
