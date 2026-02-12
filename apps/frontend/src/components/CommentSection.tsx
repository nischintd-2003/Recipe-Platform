import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  CircularProgress,
  Stack,
  Skeleton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "../context/auth.context";
import { useComments, useCommentMutations } from "../hooks/useComment";
import CommentItem from "./CommentItem";
import { toast } from "react-toastify";
import ConfirmationModal from "./ConfirmationModal";
import type { CommentSectionProps } from "../interfaces/props.interface";
import { BUTTON, COMPONENTS, MESSAGES, PLACEHOLDER } from "../config/constants";

const CommentSection = ({ recipeId }: CommentSectionProps) => {
  const { state } = useAuth();
  const { data: comments, isLoading } = useComments(recipeId);
  const { addMutation, updateMutation, deleteMutation } =
    useCommentMutations(recipeId);

  const [newComment, setNewComment] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!newComment.trim()) return;

    addMutation.mutate(
      { recipeId, content: newComment },
      {
        onSuccess: () => {
          setNewComment("");
        },
        onError: () => toast.error(MESSAGES.ERROR.ADD_FAILED),
      },
    );
  };

  const handleEdit = (commentId: number, content: string) => {
    updateMutation.mutate(
      { recipeId, commentId, content },
      { onError: () => toast.error(MESSAGES.ERROR.UPDATE_FAILED) },
    );
  };

  const handleDelete = (commentId: number) => {
    setCommentToDelete(commentId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (commentToDelete) {
      deleteMutation.mutate(commentToDelete, {
        onSuccess: () => {
          setDeleteModalOpen(false);
          setCommentToDelete(null);
        },
        onError: () => toast.error(MESSAGES.ERROR.DELETE_FAILED),
      });
    }
  };

  return (
    <Box mt={6}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {COMPONENTS.COMMENTS_SECTION.COMMENTS} ({comments?.length || 0})
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {/* Comment List */}
      <Box sx={{ mb: 4 }}>
        {isLoading ? (
          // SKELETON LOADING STATE
          <Stack spacing={3}>
            {[1, 2, 3].map((i) => (
              <Box key={i}>
                <Box display="flex" gap={2} alignItems="center" mb={1}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Box>
                    <Skeleton variant="text" width={120} height={24} />
                    <Skeleton variant="text" width={80} height={16} />
                  </Box>
                </Box>

                <Skeleton
                  variant="rectangular"
                  height={60}
                  sx={{ borderRadius: 1, ml: 7 }}
                />
              </Box>
            ))}
          </Stack>
        ) : comments?.length === 0 ? (
          <Typography color="text.secondary" fontStyle="italic">
            {COMPONENTS.COMMENTS_SECTION.NO_COMMENTS_YET}
          </Typography>
        ) : (
          comments?.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </Box>

      {/* Add Comment Input */}
      {state.isAuthenticated ? (
        <Box display="flex" gap={2} alignItems="flex-start">
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder={PLACEHOLDER.WRITE_COMMENT}
            id="new-comment"
            name="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ bgcolor: "background.paper", borderRadius: 1 }}
          />
          <Button
            variant="contained"
            sx={{ mt: 1, minWidth: 100 }}
            endIcon={
              addMutation.isPending ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <SendIcon />
              )
            }
            onClick={handleSubmit}
            disabled={!newComment.trim() || addMutation.isPending}
          >
            {BUTTON.POST}
          </Button>
        </Box>
      ) : (
        <Alert severity="info">
          {COMPONENTS.COMMENTS_SECTION.PLEASE_LOGIN}
        </Alert>
      )}

      <ConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={COMPONENTS.COMMENTS_SECTION.DELETE_COMMENT}
        description={COMPONENTS.COMMENTS_SECTION.DELETE_COMMENT_DESCRIPTION}
        isLoading={deleteMutation.isPending}
      />
    </Box>
  );
};

export default CommentSection;
