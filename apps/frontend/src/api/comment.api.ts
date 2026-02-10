import api from "../config/axios";
import type {
  Comment,
  CreateCommentPayload,
  UpdateCommentPayload,
} from "../interfaces/comment.interface";

export const fetchComments = async (recipeId: number): Promise<Comment[]> => {
  const response = await api.get(`/recipe/${recipeId}/comment`);
  return response.data;
};

export const addComment = async ({
  recipeId,
  content,
}: CreateCommentPayload): Promise<Comment> => {
  const response = await api.post(`/recipe/${recipeId}/comment`, { content });
  return response.data;
};

export const updateComment = async ({
  recipeId,
  commentId,
  content,
}: UpdateCommentPayload): Promise<Comment> => {
  const response = await api.patch(`/recipe/${recipeId}/comment/${commentId}`, {
    content,
  });
  return response.data;
};

export const deleteComment = async (
  recipeId: number,
  commentId: number,
): Promise<void> => {
  await api.delete(`/recipe/${recipeId}/comment/${commentId}`);
};
