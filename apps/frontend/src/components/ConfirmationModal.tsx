import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import type { ConfirmationModalProps } from "../interfaces/props.interface";
import { BUTTON } from "../config/constants";

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  isLoading = false,
}: ConfirmationModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, p: 1 },
      }}
    >
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", gap: 1.5, pb: 1 }}
      >
        <WarningAmberIcon color="error" />
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          color="inherit"
          disabled={isLoading}
          sx={{ fontWeight: 600 }}
        >
          {BUTTON.CANCEL}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          disabled={isLoading}
          disableElevation
          sx={{ fontWeight: 600 }}
        >
          {isLoading ? BUTTON.DELETING : BUTTON.DELETE}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
