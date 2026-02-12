export interface CommentResponseDTO {
  id: number;
  content: string;
  createdAt: Date;
  user: {
    id: number;
    email: string;
  };
}
