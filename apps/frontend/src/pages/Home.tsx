import {
  Container,
  Grid,
  Typography,
  Skeleton,
  Alert,
  Box,
} from "@mui/material";
import { useRecipes } from "../hooks/useRecipes";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const { data: recipes, isLoading, isError, error } = useRecipes();

  if (isLoading) {
    return (
      <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {[...Array(6)].map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton
                variant="rectangular"
                height={180}
                sx={{ borderRadius: 3, mb: 1 }}
              />
              <Skeleton variant="text" width="60%" height={30} />
              <Skeleton variant="text" width="40%" />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">Failed to load recipes: {error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      {/* Hero Banner */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 180, md: 260 },
          borderRadius: 4,
          overflow: "hidden",
          mb: 5,
        }}
      >
        {/* Image */}
        <Box
          component="img"
          src="https://picsum.photos/1200/400?blur"
          alt="Food banner"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0.15))",
            display: "flex",
            alignItems: "center",
            px: { xs: 2, md: 6 },
          }}
        >
          <Box>
            <Typography variant="h3" fontWeight={800} color="common.white">
              Explore{" "}
              <Box component="span" color="warning.main">
                Fudo
              </Box>
              <br />
              Insights
            </Typography>
          </Box>
        </Box>
      </Box>

      <Typography variant="h4" fontWeight={700} mb={4} color="text.primary">
        Cook Fresh Recipes
      </Typography>

      {recipes?.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No recipes found. Be the first to add one!
        </Typography>
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

export default Home;
