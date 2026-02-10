import { useState } from "react";
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { uploadImageToCloudinary } from "../utils/cloudinary";
import { toast } from "react-toastify";

interface Props {
  value?: string;
  onChange: (url: string) => void;
  error?: boolean;
}

const ImageUpload = ({ value, onChange, error }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large (Max 5MB)");
      return;
    }

    setLoading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      onChange(url);
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <Box>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="image-upload-input"
        type="file"
        onChange={handleFileChange}
      />

      {!value ? (
        <label htmlFor="image-upload-input">
          <Button
            variant="outlined"
            component="span"
            fullWidth
            startIcon={
              loading ? <CircularProgress size={20} /> : <CloudUploadIcon />
            }
            disabled={loading}
            color={error ? "error" : "primary"}
            sx={{
              height: 56,
              borderStyle: "dashed",
              borderWidth: 2,
              borderColor: error ? "error.main" : "divider",
              color: "text.secondary",
            }}
          >
            {loading ? "Uploading..." : "Upload Cover Image"}
          </Button>
        </label>
      ) : (
        <Box
          position="relative"
          width="100%"
          height={200}
          borderRadius={2}
          overflow="hidden"
          border="1px solid"
          borderColor="divider"
        >
          <img
            src={value}
            alt="Preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <IconButton
            onClick={handleRemove}
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(0,0,0,0.6)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;
