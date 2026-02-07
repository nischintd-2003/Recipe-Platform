import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { isAxiosError } from "axios";
import { storage } from "../utils/storage";
import { loginSchema, signupSchema } from "../validation/auth.schema";
import { useAuth } from "../context/auth.context";
import type { AuthMode } from "../interfaces/auth.interface";
import { useLoginMutation, useSignupMutation } from "../hooks/useAuth";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 300, sm: 400 },
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  gap: 3,
  display: "flex",
  flexDirection: "column",
  outline: "none",
};

type Props = {
  open: boolean;
  onClose: () => void;
};

interface FormState {
  username: string;
  email: string;
  password: string;
}

const AuthModal = ({ open, onClose }: Props) => {
  const { dispatch } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");

  const loginMutation = useLoginMutation();
  const signupMutation = useSignupMutation();

  const promptText =
    mode === "login" ? "Don't have an account? " : "Already have an account? ";

  const [form, setForm] = useState<FormState>({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };

  const handleSubmit = async () => {
    const schema = mode === "login" ? loginSchema : signupSchema;
    const result = schema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      let authData;

      if (mode === "login") {
        authData = await loginMutation.mutateAsync({
          email: form.email,
          password: form.password,
        });
      } else {
        await signupMutation.mutateAsync({
          username: form.username,
          email: form.email,
          password: form.password,
        });

        authData = await loginMutation.mutateAsync({
          email: form.email,
          password: form.password,
        });
      }

      storage.setToken(authData.token);
      storage.setUser(authData.user);

      dispatch({
        type: "LOGIN",
        payload: {
          user: authData.user,
          token: authData.token,
        },
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Authentication failed";
        setErrors({ server: message });
      } else {
        setErrors({ server: "An unexpected error occurred" });
      }
    }

    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="auth-modal"
      aria-describedby="login-signup-modal"
    >
      <Box sx={modalStyle}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight={600}>
            {mode === "login" ? "Login" : "Create Account"}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Inputs */}
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {mode === "signup" && (
            <TextField
              label="Username"
              value={form.username}
              onChange={handleChange("username")}
              error={Boolean(errors.username)}
              helperText={errors.username}
              fullWidth
            />
          )}

          <TextField
            label="Email"
            value={form.email}
            onChange={handleChange("email")}
            error={Boolean(errors.email)}
            helperText={errors.email}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange("password")}
            error={Boolean(errors.password)}
            helperText={errors.password}
            fullWidth
          />

          {/* Action Button */}
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={loginMutation.isPending || signupMutation.isPending}
          >
            {loginMutation.isPending || signupMutation.isPending
              ? "Processing..."
              : mode === "login"
                ? "Login"
                : "Sign Up"}
          </Button>

          <Typography
            variant="body2"
            textAlign="center"
            sx={{ mt: 3, color: "text.secondary", cursor: "pointer" }}
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {promptText}
            {mode === "login" ? "Sign up" : "Login"}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
