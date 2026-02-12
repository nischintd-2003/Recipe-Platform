export interface RatingResponseDTO {
  id: number;
  value: number;
  createdAt: Date;
  user: {
    id: number;
    email: string;
  };
}

export interface RatingSummaryDTO {
  averageRating: number;
  ratingCount: number;
}

export interface UserRatingDTO {
  userRating: number | null;
}
