import {
  Container,
  Grid,
  Typography,
  Skeleton,
  Alert,
  Box,
  Button,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRecipes } from "../hooks/useRecipes";
import RecipeCard from "../components/RecipeCard";
import {
  InitialRecipeFilters,
  type RecipeFilters,
} from "../interfaces/recipe.interface";
import { useDebounce } from "../hooks/useDebounce";
import { useState } from "react";
import RecipeFiltersUI from "../components/RecipeFiltersUI";
import heroImage from "../assets/images/recipe-hero-image.jpg";

const Home = () => {
  const [filters, setFilters] = useState<RecipeFilters>(InitialRecipeFilters);

  const debouncedSearch = useDebounce(filters.q, 500);

  const {
    data: recipes,
    isLoading,
    isError,
    error,
    isPlaceholderData,
  } = useRecipes({
    ...filters,
    q: debouncedSearch,
    minRating: filters.minRating === 0 ? undefined : filters.minRating,
  });

  const handleFilterChange = (newFilters: Partial<RecipeFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          src={heroImage}
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

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4" fontWeight={700} mb={4} color="text.primary">
          Cook Fresh Recipes
        </Typography>

        <RecipeFiltersUI
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={() => setFilters(InitialRecipeFilters)}
        />
      </Box>

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

      <Box display={"flex"} justifyContent={"center"} gap={2} mt={6}>
        <Button
          variant="outlined"
          onClick={() => handlePageChange((filters.page || 1) - 1)}
          disabled={filters.page === 1}
        >
          <ChevronLeftIcon />
        </Button>

        <Typography variant="body1" alignSelf={"center"}>
          Page {filters.page}
        </Typography>

        <Button
          variant="outlined"
          onClick={() => handlePageChange((filters.page || 1) + 1)}
          disabled={
            isPlaceholderData || (recipes?.length || 0) < (filters.limit || 9)
          }
        >
          <ChevronRightIcon />
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
