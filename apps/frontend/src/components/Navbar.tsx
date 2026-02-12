import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Menu, MenuItem, Divider, ListItemIcon } from "@mui/material";
import { useAuth } from "../context/auth.context";
import { storage } from "../utils/storage";
import AuthModal from "./AuthModal";
import { APP_NAME, BUTTON, COMPONENTS, ROUTES } from "../config/constants";

const navLinks = [
  { name: "Recipes", path: ROUTES.RECIPES },
  { name: "My Recipes", path: ROUTES.MY_RECIPES },
  { name: "Favorite Recipes", path: ROUTES.FAVORITES },
];

const Navbar = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = state.isAuthenticated;

  //mobile menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  //user menu
  const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);
  const isUserMenuOpen = Boolean(userAnchorEl);

  const [authOpen, setAuthOpen] = useState(false);

  //mobile
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //user
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setUserAnchorEl(null);
  };

  const handleLogout = () => {
    storage.clear();
    dispatch({ type: "LOGOUT" });
    handleUserMenuClose();
    navigate(ROUTES.HOME);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0}>
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
              variant="h5"
              component="div"
              color="primary"
              sx={{
                fontWeight: 900,
                letterSpacing: 4,
                cursor: "pointer",
              }}
              onClick={() => navigate(ROUTES.HOME)}
            >
              {APP_NAME}
            </Typography>
          </Box>

          {/* Middle Section: Navigation Links (Desktop) */}
          {isLoggedIn && (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                height: "64px",
              }}
            >
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path ||
                  (link.path === ROUTES.RECIPES &&
                    location.pathname === ROUTES.HOME);

                return (
                  <Button
                    key={link.name}
                    color="inherit"
                    onClick={() => navigate(link.path)}
                    sx={{
                      fontWeight: 500,
                      height: "100%",
                      borderRadius: 0,
                      borderBottom: "3px solid",
                      borderColor: isActive ? "primary.main" : "transparent",
                      color: isActive ? "primary.main" : "text.primary",
                      "&:hover": {
                        bgcolor: "transparent",
                        color: "primary.main",
                      },
                    }}
                  >
                    {link.name}
                  </Button>
                );
              })}
            </Box>
          )}

          {/* Right Section: User Avatar or Login Button */}
          <Box sx={{ ml: "auto" }}>
            {isLoggedIn ? (
              <>
                <IconButton
                  color="inherit"
                  size="large"
                  aria-label="user-profile"
                  onClick={handleUserMenuOpen}
                >
                  <AccountCircleIcon fontSize="large" color="action" />
                </IconButton>

                {/* User Dropdown Menu */}
                <Menu
                  anchorEl={userAnchorEl}
                  open={isUserMenuOpen}
                  onClose={handleUserMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      minWidth: 200,
                      borderRadius: 2,
                      boxShadow: 3,
                    },
                  }}
                >
                  <MenuItem disabled sx={{ opacity: "1 !important" }}>
                    <Typography variant="body2" color="text.secondary">
                      {COMPONENTS.NAVBAR.SIGNED_AS}
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    disabled
                    sx={{ opacity: "1 !important", mt: -1, pb: 2 }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      color="text.primary"
                    >
                      {state.user?.email}
                    </Typography>
                  </MenuItem>

                  <Divider />

                  <MenuItem
                    onClick={handleLogout}
                    sx={{ color: "error.main", mt: 1 }}
                  >
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    {BUTTON.LOGOUT}
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setAuthOpen(true)}
                sx={{
                  borderRadius: 2,
                  borderWidth: "2px",
                  fontWeight: "bold",
                  borderColor: "primary.main",
                  "&:hover": {
                    borderWidth: "2px",
                    borderColor: "primary.dark",
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                {BUTTON.LOGIN}
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Menu */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {navLinks.map((link) => (
          <MenuItem key={link.name} onClick={() => handleNavigate(link.path)}>
            {link.name}
          </MenuItem>
        ))}
      </Menu>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </Box>
  );
};

export default Navbar;
