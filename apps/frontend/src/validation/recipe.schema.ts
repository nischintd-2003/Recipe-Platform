import * as z from "zod";

export const createRecipeSchema = z.object({
  title: z.string().min(3, { error: "Title must be at least 3 characters" }),
  ingredients: z.string().min(10, { error: "List at least a few ingredients" }),
  steps: z.string().min(10, { error: "Describe the steps clearly" }),
  prepTime: z.coerce.number().min(1, { error: "Prep time must be positive" }),
  image: z
    .union([z.url({ error: () => "Must be a valid URL" }), z.literal("")])
    .optional(),
});

export type CreateRecipeForm = z.infer<typeof createRecipeSchema>;
