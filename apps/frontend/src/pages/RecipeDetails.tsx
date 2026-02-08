import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Chip,
  Rating,
  Avatar,
  Paper,
  Divider,
  Button,
  Skeleton,
  Alert,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import { useRecipe } from "../hooks/useRecipes";

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: recipe, isLoading, isError, error } = useRecipe(id);

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Skeleton
          variant="rectangular"
          height={300}
          sx={{ borderRadius: 4, mb: 4 }}
        />
        <Skeleton variant="text" height={60} width="60%" />
        <Skeleton variant="text" height={30} width="40%" />
        <Box sx={{ mt: 4 }}>
          <Skeleton variant="rectangular" height={200} />
        </Box>
      </Container>
    );
  }

  if (isError || !recipe) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error?.message || "Recipe not found."}</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Navigation & Header */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2, color: "text.secondary" }}
      >
        Back to Recipes
      </Button>

      {/* Hero Image */}
      <Box
        component="img"
        src={recipe.imageUrl || "https://placehold.co/800x400?text=No+Image"}
        alt={recipe.title}
        sx={{
          width: "100%",
          height: { xs: 250, md: 400 },
          objectFit: "cover",
          borderRadius: 4,
          boxShadow: 3,
          mb: 4,
        }}
      />

      {/* Title & Metadata */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" fontWeight={800} gutterBottom>
          {recipe.title}
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={2} alignItems="center" mb={2}>
          <Chip
            icon={<AccessTimeIcon />}
            label={`${recipe.prepTime} mins`}
            color="primary"
            variant="outlined"
          />
          <Box display="flex" alignItems="center" gap={0.5}>
            <Rating
              value={Number(recipe.averageRating)}
              precision={0.5}
              readOnly
            />
            <Typography variant="body2" color="text.secondary">
              ({recipe.ratingCount} reviews)
            </Typography>
          </Box>
        </Box>

        {/* Author Info */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle2" color="text.primary">
              Created by
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {recipe.user?.email.split("@")[0] || "Unknown Chef"}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Content Grid */}
      <Box display="grid" gridTemplateColumns={{ md: "1fr 2fr" }} gap={4}>
        {/* Left Column: Ingredients */}
        <Box>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: "orange.50",
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              gutterBottom
              color="primary.dark"
            >
              Ingredients
            </Typography>
            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}
            >
              {recipe.ingredients}
            </Typography>
          </Paper>
        </Box>

        {/* Right Column: Steps */}
        <Box>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Instructions
          </Typography>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-line",
              lineHeight: 1.8,
              color: "text.secondary",
            }}
          >
            {recipe.steps}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RecipeDetails;
