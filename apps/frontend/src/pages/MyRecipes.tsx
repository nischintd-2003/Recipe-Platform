import {
  Container,
  Grid,
  Typography,
  Skeleton,
  Box,
  Alert,
} from "@mui/material";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import RecipeCard from "../components/RecipeCard";
import { useMyRecipes } from "../hooks/useRecipes";

const MyRecipes = () => {
  const { data: recipes, isLoading, isError, error } = useMyRecipes();

  if (isLoading) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={4}>
          My Recipes
        </Typography>
        <Grid container spacing={4}>
          {[...Array(6)].map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton
                variant="rectangular"
                height={180}
                sx={{ borderRadius: 3, mb: 1 }}
              />
              <Skeleton variant="text" width="60%" height={30} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">
          Failed to load your recipes: {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <LocalDiningIcon color="primary" fontSize="large" />
        <Typography variant="h4" fontWeight={700} color="text.primary">
          My Kitchen
        </Typography>
      </Box>

      {recipes?.length === 0 ? (
        <Box textAlign="center" py={10} bgcolor="grey.50" borderRadius={4}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            You haven't posted any recipes yet.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Click the "Create Recipe" button to share your culinary skills!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {recipes?.map((recipe) => (
            <Grid key={recipe.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <RecipeCard recipe={recipe} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyRecipes;
