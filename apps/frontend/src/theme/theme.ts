import { createTheme } from "@mui/material";
import { orange, teal } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: orange,
    secondary: teal,
  },
  typography: {
    fontFamily: "Poppins , Roboto , sans-serif",
  },
});
