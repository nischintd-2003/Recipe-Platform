import { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useToggleFavoriteMutation } from "../hooks/useRecipeMutations";
import { useAuth } from "../context/auth.context";

interface Props {
  recipeId: number;
  initialState?: boolean;
}

const FavoriteButton = ({ recipeId, initialState = false }: Props) => {
  const { state } = useAuth();

  const [isFavorited, setIsFavorited] = useState(initialState);

  const toggleFavouritemutation = useToggleFavoriteMutation();

  useEffect(() => {
    setIsFavorited(initialState);
  }, [initialState]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!state.isAuthenticated) {
      toast.error("Please log in to rate recipes");
      return;
    }

    const newState = !isFavorited;
    setIsFavorited(newState);

    toggleFavouritemutation.mutate(
      { id: recipeId, isFavorited: !newState },
      {
        onError: () => {
          setIsFavorited(!newState);
        },
      },
    );
  };

  return (
    <Tooltip title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}>
      <IconButton
        onClick={handleToggle}
        color="error"
        disabled={toggleFavouritemutation.isPending}
        sx={{
          transform: isFavorited ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.2s",
        }}
      >
        {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default FavoriteButton;
