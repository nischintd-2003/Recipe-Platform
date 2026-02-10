import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { useAuth } from "../context/auth.context";
import AuthModal from "./AuthModal";

const navLinks = [
  { name: "Recipes", path: "/recipes" },
  { name: "My Recipes", path: "/my-recipes" },
  { name: "Favorite Recipes", path: "/favorites" },
];

const Navbar = () => {
  const { state } = useAuth();
  const isLoggedIn = state.isAuthenticated;

  const [authOpen, setAuthOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color={"transparent"}>
        <Toolbar>
          {/* Left Section: Logo and Mobile Menu Icon */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isLoggedIn && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, display: { xs: "flex", md: "none" } }}
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h6"
              component="div"
              color="primary"
              sx={{ fontWeight: 700, letterSpacing: 1 }}
            >
              Fudo
            </Typography>
          </Box>

          {/* Middle Section: Navigation Links*/}
          {isLoggedIn && (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
              }}
            >
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  color="inherit"
                  sx={{ fontWeight: 500 }}
                >
                  {link.name}
                </Button>
              ))}
            </Box>
          )}

          {/* Right Section: User Avatar or Login Button */}
          <Box sx={{ ml: "auto" }}>
            {isLoggedIn ? (
              <IconButton
                color="inherit"
                size="large"
                aria-label="user-profile"
              >
                <AccountCircleIcon />
              </IconButton>
            ) : (
              <Button color="inherit" onClick={() => setAuthOpen(true)}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {/* Mobile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {navLinks.map((link) => (
          <MenuItem key={link.name} onClick={handleMenuClose}>
            {link.name}
          </MenuItem>
        ))}
      </Menu>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </Box>
  );
};

export default Navbar;
