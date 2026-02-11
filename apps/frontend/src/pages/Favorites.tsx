import {
  Container,
  Grid,
  Typography,
  Skeleton,
  Box,
  Alert,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RecipeCard from "../components/RecipeCard";
import { useFavorites } from "../hooks/useFavorites";
import { MESSAGES } from "../config/constants";

const Favorites = () => {
  const { data: recipes, isLoading, isError, error } = useFavorites();

  if (isLoading) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={4}>
          {MESSAGES.FAVORITE_RECIPE.TITLE}
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
          {MESSAGES.ERROR.LOAD_FAILED} {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <FavoriteIcon color="error" fontSize="large" />
        <Typography variant="h4" fontWeight={700} color="text.primary">
          {MESSAGES.FAVORITE_RECIPE.YOUR_FAVORITE}
        </Typography>
      </Box>

      {recipes?.length === 0 ? (
        <Box textAlign="center" py={10} bgcolor="grey.50" borderRadius={4}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {MESSAGES.FAVORITE_RECIPE.NO_FAVORITE_YET}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {MESSAGES.FAVORITE_RECIPE.SAVE_FAVORITE}
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

export default Favorites;
