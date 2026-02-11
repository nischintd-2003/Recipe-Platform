import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "../context/auth.context";
import { useComments, useCommentMutations } from "../hooks/useComment";
import CommentItem from "./CommentItem";
import { toast } from "react-toastify";
import ConfirmationModal from "./ConfirmationModal";
import type { CommentSectionProps } from "../interfaces/props.interface";


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
        onError: () => toast.error("Failed to add comment"),
      },
    );
  };

  const handleEdit = (commentId: number, content: string) => {
    updateMutation.mutate(
      { recipeId, commentId, content },
      { onError: () => toast.error("Failed to update comment") },
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
        onError: () => toast.error("Failed to delete comment"),
      });
    }
  };

  if (isLoading) return <CircularProgress size={20} />;

  return (
    <Box mt={6}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Comments ({comments?.length || 0})
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {/* Comment List */}
      <Box sx={{ mb: 4 }}>
        {comments?.length === 0 ? (
          <Typography color="text.secondary" fontStyle="italic">
            No comments yet. Be the first to share your thoughts!
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
            placeholder="Write a comment..."
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
            Post
          </Button>
        </Box>
      ) : (
        <Alert severity="info">Please log in to leave a comment.</Alert>
      )}

      <ConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Comment?"
        description="Are you sure you want to remove this comment?"
        isLoading={deleteMutation.isPending}
      />
    </Box>
  );
};

export default CommentSection;
