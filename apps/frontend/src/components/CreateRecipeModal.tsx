import { Dialog } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateRecipeModal = ({ open, onClose }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md"></Dialog>
  );
};

export default CreateRecipeModal;
