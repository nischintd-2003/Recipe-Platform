import * as z from "zod";
import { MESSAGES, VALIDATION } from "../config/constants";

export const createRecipeSchema = z.object({
  title: z.string().min(VALIDATION.RECIPE.TITLE_MIN_LEN, {
    error: MESSAGES.VALIDATION.TITLE_SHORT,
  }),
  ingredients: z.string().min(VALIDATION.RECIPE.INGREDIENTS_MIN_LEN, {
    error: MESSAGES.VALIDATION.INGREDIENTS_SHORT,
  }),
  steps: z.string().min(VALIDATION.RECIPE.STEPS_MIN_LEN, {
    error: MESSAGES.VALIDATION.STEPS_SHORT,
  }),
  prepTime: z.coerce.number().min(VALIDATION.RECIPE.PREP_TIME_MIN, {
    error: MESSAGES.VALIDATION.PREP_TIME_INVALID,
  }),
  image: z
    .union([
      z.url({ error: () => MESSAGES.VALIDATION.URL_INVALID }),
      z.literal(""),
    ])
    .optional(),
});

export type CreateRecipeForm = z.infer<typeof createRecipeSchema>;
