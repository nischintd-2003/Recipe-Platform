import { useState } from "react";
import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../context/auth.context";
import CreateRecipeModal from "./CreateRecipeModal";
import { COMPONENTS } from "../config/constants";

const GlobalFab = () => {
  const { state } = useAuth();
  const [open, setOpen] = useState(false);

  if (!state.isAuthenticated) return null;

  return (
    <>
      <Tooltip title="Create Recipe" placement="left">
        <Fab
          color="primary"
          aria-label="add"
          variant="extended"
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            zIndex: 1000,
            boxShadow: 4,
          }}
          onClick={() => setOpen(true)}
        >
          <AddIcon sx={{ mr: 1 }} />
          {COMPONENTS.GLOBAL_FAB.CREATE_RECIPE}
        </Fab>
      </Tooltip>

      <CreateRecipeModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default GlobalFab;
