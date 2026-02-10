import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchComments,
  addComment,
  updateComment,
  deleteComment,
} from "../api/comment.api";

export const useComments = (recipeId: number) => {
  return useQuery({
    queryKey: ["comments", recipeId],
    queryFn: () => fetchComments(recipeId),
  });
};

export const useCommentMutations = (recipeId: number) => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["comments", recipeId] });
  };

  const addMutation = useMutation({
    mutationFn: addComment,
    onSuccess,
  });

  const updateMutation = useMutation({
    mutationFn: updateComment,
    onSuccess,
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(recipeId, commentId),
    onSuccess,
  });

  return { addMutation, updateMutation, deleteMutation };
};
