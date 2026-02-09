import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCreateRecipeMutation } from "../hooks/useRecipeMutations";
import {
  createRecipeSchema,
  type CreateRecipeForm,
} from "../validation/recipe.schema";
import { isAxiosError } from "axios";
import { InitialCreateRecipeForm } from "../interfaces/recipe.interface";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateRecipeModal = ({ open, onClose }: Props) => {
  const createRecipe = useCreateRecipeMutation();
  const [form, setForm] = useState<CreateRecipeForm>(InitialCreateRecipeForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = () => {
    setServerError(null);
    const result = createRecipeSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    createRecipe.mutate(result.data, {
      onSuccess: () => {
        onClose();
        setForm(InitialCreateRecipeForm);
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          setServerError(
            error.response?.data?.message || "Failed to create recipe",
          );
        } else {
          setServerError("Something went wrong");
        }
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Share Your Recipe
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Recipe Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
          />

          <Box display="flex" gap={2}>
            <TextField
              label="Prep Time (mins)"
              name="prepTime"
              type="number"
              value={form.prepTime}
              onChange={handleChange}
              error={!!errors.prepTime}
              helperText={errors.prepTime}
              sx={{ flex: 1 }}
            />
            <TextField
              label="Image URL"
              name="image"
              value={form.image}
              onChange={handleChange}
              error={!!errors.image}
              helperText={errors.image}
              sx={{ flex: 2 }}
            />
          </Box>

          <TextField
            label="Ingredients"
            name="ingredients"
            multiline
            rows={4}
            value={form.ingredients}
            onChange={handleChange}
            error={!!errors.ingredients}
            helperText={errors.ingredients}
            placeholder="List ingredients here..."
            fullWidth
          />

          <TextField
            label="Steps"
            name="steps"
            multiline
            rows={4}
            value={form.steps}
            onChange={handleChange}
            error={!!errors.steps}
            helperText={errors.steps}
            placeholder="Describe the cooking process..."
            fullWidth
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={createRecipe.isPending}
        >
          {createRecipe.isPending ? "Publishing..." : "Publish Recipe"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRecipeModal;
