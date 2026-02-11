import { z } from "zod";

export const createRecipeSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    ingredients: z
      .string()
      .min(10, "Ingredients must be at least 10 characters"),
    steps: z.string().min(10, "Steps must be at least 10 characters"),
    prepTime: z.coerce.number().min(1, "Prep time must be a positive number"),
    image: z.string().optional(),
  }),
});

export const updateRecipeSchema = z.object({
  params: z.object({
    recipeId: z.coerce.number({
      error: (iss) =>
        iss.code === "invalid_type" ? "Recipe ID must be a number" : undefined,
    }),
  }),
  body: z.object({
    title: z.string().min(3).optional(),
    ingredients: z.string().min(10).optional(),
    steps: z.string().min(10).optional(),
    prepTime: z.coerce.number().min(1).optional(),
    image: z.string().optional(),
  }),
});

export const commentSchema = z.object({
  body: z.object({
    content: z
      .string()
      .min(1, "Comment cannot be empty")
      .max(500, "Comment too long"),
  }),
});

export const ratingSchema = z.object({
  body: z.object({
    value: z.number().min(1).max(5),
  }),
});
