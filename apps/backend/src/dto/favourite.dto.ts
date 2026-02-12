export interface FavouriteResponseDTO {
  id: number;
  createdAt: Date;
  recipe: {
    id: number;
    title: string;
    averageRating: number;
    ratingCount: number;
  };
}
