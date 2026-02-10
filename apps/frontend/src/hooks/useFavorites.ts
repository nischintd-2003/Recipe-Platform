import { useQuery } from "@tanstack/react-query";
import { fetchFavorites } from "../api/favorite.api";

export const useFavorites = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
  });
};
