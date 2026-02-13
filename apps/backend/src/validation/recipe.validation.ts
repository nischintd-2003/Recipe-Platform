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

export const paginationSchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(10),
    q: z.string().optional(),
    sort: z.enum(["latest", "rating"]).optional(),
    minRating: z.coerce.number().min(0).max(5).optional(),
    maxPrepTime: z.coerce.number().min(1).optional(),
  }),
});

export const recipeIdSchema = z.object({
  params: z.object({
    recipeId: z.coerce
      .number({
        error: (iss) =>
          iss.code === "invalid_type"
            ? "Recipe ID must be a number"
            : undefined,
      })
      .int()
      .positive(),
  }),
});

export const commentParamsSchema = z.object({
  params: z.object({
    recipeId: z.coerce.number().int().positive(), 
    commentId: z.coerce.number().int().positive(),
  }),
});