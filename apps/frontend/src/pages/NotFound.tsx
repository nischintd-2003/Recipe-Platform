import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { BUTTON, ROUTES } from "../config/constants";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
          gap: 3,
          mt: 4,
        }}
      >
        {/* Icon */}
        <SentimentDissatisfiedIcon
          sx={{ fontSize: 100, color: "text.secondary", opacity: 0.5 }}
        />

        {/* Text Content */}
        <Box>
          <Typography
            variant="h2"
            fontWeight={700}
            color="primary"
            gutterBottom
          >
            404
          </Typography>
          <Typography variant="h5" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Oops! The recipe you are looking for seems to have been eaten.
          </Typography>
        </Box>

        {/* Action Button */}
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate(ROUTES.HOME)}
          sx={{ mt: 2, borderRadius: 2, px: 4 }}
        >
          {BUTTON.GO_HOME}
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
