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
  Grid,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography variant="h5" fontWeight={800}>
          {isEditMode ? "Edit Recipe" : "Create New Recipe"}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box px={3} pb={2}>
        <Typography variant="body2" color="text.secondary">
          Fill in the details below to share your masterpiece with the food
          community.
        </Typography>
      </Box>

      <Divider />

      <DialogContent sx={{ py: 3 }}>
        {serverError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {serverError}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Title & Prep Time */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="subtitle2" fontWeight={700} mb={1}>
              RECIPE TITLE
            </Typography>
            <TextField
              placeholder="e.g. Pasta"
              name="title"
              value={form.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" fontWeight={700} mb={1}>
              PREP TIME (MINS)
            </Typography>
            <TextField
              placeholder="e.g. 45"
              name="prepTime"
              type="number"
              value={form.prepTime || ""}
              onChange={handleChange}
              error={!!errors.prepTime}
              helperText={errors.prepTime}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* Image Upload */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle2" fontWeight={700} mb={1}>
              COVER IMAGE
            </Typography>
            <ImageUpload
              value={form.image}
              onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
              error={!!errors.image}
            />
            {errors.image && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                {errors.image}
              </Typography>
            )}
          </Grid>

          {/* Ingredients */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle2" fontWeight={700} mb={1}>
              INGREDIENTS
            </Typography>
            <TextField
              name="ingredients"
              multiline
              rows={5}
              value={form.ingredients}
              onChange={handleChange}
              error={!!errors.ingredients}
              helperText={
                errors.ingredients ||
                "List one ingredient per line (e.g. 2 cups Flour)"
              }
              placeholder="2 eggs&#10;1 cup flour&#10;1 tsp vanilla extract"
              fullWidth
              sx={{ bgcolor: "background.paper" }}
            />
          </Grid>

          {/* Steps */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle2" fontWeight={700} mb={1}>
              COOKING INSTRUCTIONS
            </Typography>
            <TextField
              name="steps"
              multiline
              rows={6}
              value={form.steps}
              onChange={handleChange}
              error={!!errors.steps}
              helperText={
                errors.steps || "Describe the steps to prepare your dish..."
              }
              placeholder="Preheat the oven...&#10;Mix dry ingredients..."
              fullWidth
              sx={{ bgcolor: "background.paper" }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 3, justifyContent: "flex-end", gap: 1 }}>
        <Button
          onClick={onClose}
          color="inherit"
          variant="outlined"
          sx={{ fontWeight: 600, borderColor: "divider" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isLoading}
          disableElevation
          startIcon={!isLoading && <CloudUploadIcon />}
          sx={{ fontWeight: 600, px: 3, py: 1 }}
        >
          {isLoading
            ? "Submitting..."
            : isEditMode
              ? "Save Changes"
              : "Submit Recipe"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRecipeModal;
