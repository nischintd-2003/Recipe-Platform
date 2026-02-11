import api from "../config/axios";
import { API_ROUTES } from "../config/constants";
import type {
  Comment,
  CreateCommentPayload,
  UpdateCommentPayload,
} from "../interfaces/comment.interface";

export const fetchComments = async (recipeId: number): Promise<Comment[]> => {
  const response = await api.get(API_ROUTES.RECIPE.COMMENT(recipeId));
  return response.data;
};

export const addComment = async ({
  recipeId,
  content,
}: CreateCommentPayload): Promise<Comment> => {
  const response = await api.post(API_ROUTES.RECIPE.COMMENT(recipeId), {
    content,
  });
  return response.data;
};

export const updateComment = async ({
  recipeId,
  commentId,
  content,
}: UpdateCommentPayload): Promise<Comment> => {
  const response = await api.patch(
    API_ROUTES.RECIPE.COMMENT_BY_ID(recipeId, commentId),
    {
      content,
    },
  );
  return response.data;
};

export const deleteComment = async (
  recipeId: number,
  commentId: number,
): Promise<void> => {
  await api.delete(API_ROUTES.RECIPE.COMMENT_BY_ID(recipeId, commentId));
};
