import { useState, useEffect } from "react";
import { Box, Typography, Rating, Paper } from "@mui/material";
import { toast } from "react-toastify";
import { useRateRecipeMutation } from "../hooks/useRecipeMutations";
import { useAuth } from "../context/auth.context";
import { isAxiosError } from "axios";
import type { RateRecipeProps } from "../interfaces/props.interface";
import { COMPONENTS, MESSAGES } from "../config/constants";

const RateRecipe = ({ recipeId, existingRating }: RateRecipeProps) => {
  const { state } = useAuth();
  const rateRecipemutation = useRateRecipeMutation();
  const [value, setValue] = useState<number | null>(existingRating || null);

  useEffect(() => {
    if (existingRating) setValue(existingRating);
  }, [existingRating]);

  const handleChange = (_: React.SyntheticEvent, newValue: number | null) => {
    if (!newValue) return;

    if (!state.isAuthenticated) {
      toast.error(MESSAGES.ERROR.LOGIN_FIRST);
      return;
    }

    rateRecipemutation.mutate(
      { id: recipeId, value: newValue },
      {
        onSuccess: () => {
          setValue(newValue);
        },
        onError: (error) => {
          setValue(existingRating || null);
          if (isAxiosError(error)) {
            toast.error(
              error.response?.data?.message || MESSAGES.ERROR.OP_FAILED,
            );
          } else {
            toast.error(MESSAGES.ERROR.GENERIC);
          }
        },
      },
    );
  };

  if (existingRating) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mt: 3,
          textAlign: "center",
          bgcolor: "success.light",
          color: "white",
          borderRadius: 3,
        }}
      >
        <Typography variant="subtitle1" fontWeight={700}>
          {COMPONENTS.RATE_RECIPE.YOU_RATED}
        </Typography>
        <Box display="flex" justifyContent="center" my={1}>
          <Rating value={existingRating} readOnly sx={{ color: "white" }} />
        </Box>
        <Typography variant="caption">
          {COMPONENTS.RATE_RECIPE.FEEDBACK}
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mt: 3,
        textAlign: "center",
        bgcolor: "orange.50",
        border: "1px dashed",
        borderColor: "primary.main",
        borderRadius: 3,
      }}
    >
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        {COMPONENTS.RATE_RECIPE.RECIPE_TRIED}
      </Typography>
      <Rating
        name="recipe-rating"
        value={value}
        onChange={handleChange}
        size="large"
        disabled={rateRecipemutation.isPending}
      />
    </Paper>
  );
};

export default RateRecipe;
