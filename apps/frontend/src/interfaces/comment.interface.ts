export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    email: string;
  };
}

export interface CreateCommentPayload {
  recipeId: number;
  content: string;
}

export interface UpdateCommentPayload {
  recipeId: number;
  commentId: number;
  content: string;
}
