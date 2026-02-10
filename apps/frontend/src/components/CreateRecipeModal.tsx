import { useEffect, useState } from "react";
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
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
} from "../hooks/useRecipeMutations";
import {
  createRecipeSchema,
  type CreateRecipeForm,
} from "../validation/recipe.schema";
import { isAxiosError } from "axios";
import {
  InitialCreateRecipeForm,
  type Recipe,
} from "../interfaces/recipe.interface";
import ImageUpload from "./ImageUpload";

interface Props {
  open: boolean;
  onClose: () => void;
  recipeToEdit?: Recipe;
}

const CreateRecipeModal = ({ open, onClose, recipeToEdit }: Props) => {
  const createRecipeMutation = useCreateRecipeMutation();
  const updateRecipeMutation = useUpdateRecipeMutation();

  const isEditMode = !!recipeToEdit;

  const [form, setForm] = useState<CreateRecipeForm>(InitialCreateRecipeForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (open && recipeToEdit) {
      setForm({
        title: recipeToEdit.title,
        ingredients: recipeToEdit.ingredients,
        steps: recipeToEdit.steps,
        prepTime: recipeToEdit.prepTime || 0,
        image: recipeToEdit.imageUrl || "",
      });
    } else if (open && !recipeToEdit) {
      setForm(InitialCreateRecipeForm);
    }
  }, [open, recipeToEdit]);

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

    const handleSuccess = () => {
      onClose();
      if (!isEditMode) setForm(InitialCreateRecipeForm);
    };

    const handleError = (error: unknown) => {
      if (isAxiosError(error)) {
        setServerError(error.response?.data?.message || "Operation failed");
      } else {
        setServerError("Something went wrong");
      }
    };
    if (isEditMode && recipeToEdit) {
      updateRecipeMutation.mutate(
        { id: recipeToEdit.id, data: result.data },
        { onSuccess: handleSuccess, onError: handleError },
      );
    } else {
      createRecipeMutation.mutate(result.data, {
        onSuccess: handleSuccess,
        onError: handleError,
      });
    }
  };

  const isLoading =
    createRecipeMutation.isPending || updateRecipeMutation.isPending;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {isEditMode ? "Edit Recipe" : "Share Your Recipe"}
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
            <Box sx={{ flex: 2 }}>
              <ImageUpload
                value={form.image}
                onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
                error={!!errors.image}
              />
              {errors.image && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ ml: 1.5, mt: 0.5 }}
                >
                  {errors.image}
                </Typography>
              )}
            </Box>
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
        <Button onClick={handleSubmit} variant="contained" disabled={isLoading}>
          {isLoading ? "Publishing..." : "Publish Recipe"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRecipeModal;
