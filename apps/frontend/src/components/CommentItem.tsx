import { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../context/auth.context";
import type { CommentItemProps } from "../interfaces/props.interface";
import { BUTTON } from "../config/constants";

const CommentItem = ({ comment, onEdit, onDelete }: CommentItemProps) => {
  const { state } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isOwner = state.user?.id === comment.user.id;

  const handleSave = () => {
    onEdit(comment.id, editValue);
    setIsEditing(false);
  };

  const initials = comment.user.email.substring(0, 2).toUpperCase();

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      {/* Avatar */}
      <Avatar
        sx={{ bgcolor: "primary.light", width: 40, height: 40, fontSize: 14 }}
      >
        {initials}
      </Avatar>

      <Box sx={{ flexGrow: 1 }}>
        {/* Name + Date */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 0.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="subtitle2" fontWeight={700}>
              {comment.user.email.split("@")[0]}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </Typography>
          </Box>

          {/* Actions Dropdown */}
          {isOwner && !isEditing && (
            <>
              <IconButton
                size="small"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem
                  onClick={() => {
                    setIsEditing(true);
                    setAnchorEl(null);
                  }}
                >
                  {BUTTON.EDIT}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onDelete(comment.id);
                    setAnchorEl(null);
                  }}
                  sx={{ color: "error.main" }}
                >
                  {BUTTON.DELETE}
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>

        {/* Content */}
        {isEditing ? (
          <Box>
            <TextField
              fullWidth
              multiline
              size="small"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              sx={{ mb: 1, bgcolor: "background.paper" }}
            />
            <Box display="flex" gap={1} justifyContent="flex-end">
              <Button size="small" onClick={() => setIsEditing(false)}>
                {BUTTON.CANCEL}
              </Button>
              <Button size="small" variant="contained" onClick={handleSave}>
                {BUTTON.SAVE}
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ lineHeight: 1.6 }}
          >
            {comment.content}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CommentItem;
