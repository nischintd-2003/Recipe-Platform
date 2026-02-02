import { Box, Button, Container, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <Stack spacing={4} textAlign="center" width="100%">
          <Typography variant="h3" fontWeight="bold">
            Recipe Sharing Platform
          </Typography>

          <Typography variant="h6" color="text.secondary">
            Discover, share, and rate amazing recipes from around the world.
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default Landing;
