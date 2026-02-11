import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  CardActionArea,
  Chip,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import type { RecipeCardProps } from "../interfaces/props.interface";

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 3,
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardActionArea onClick={() => navigate(`/recipe/${recipe.id}`)}>
        <CardMedia
          component="img"
          height="180"
          image={recipe.imageUrl || "/image-placeholder.webp"}
          loading="lazy"
          alt={recipe.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="start"
            mb={1}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              noWrap
              sx={{ maxWidth: "70%" }}
            >
              {recipe.title}
            </Typography>
            <Chip
              icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
              label={`${recipe.prepTime}m`}
              size="small"
              variant="outlined"
            />
          </Box>

          <Box display="flex" alignItems="center" gap={0.5} mt={1}>
            <Rating
              value={Number(recipe.averageRating)}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography variant="body2" color="text.secondary">
              ({recipe.ratingCount})
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;
