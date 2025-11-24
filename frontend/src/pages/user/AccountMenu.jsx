import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Button, Menu, Typography } from "@mui/material";

import { selectUserState } from "../../features/user/userSlice";
import { logout } from "../../features/user/userThunks";

export default function AccountMenu({ open, anchorEl, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector(selectUserState);
  const name = user?.name || "Guest";

  const handleLogin = () => {
    navigate("/");
    onClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    onClose();
  };
  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      closeAfterTransition={false}
    >
      <Box
        sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        {isAuthenticated ? (
          <>
            <Typography variant="h6">Hello, {name}!</Typography>
            <Typography variant="body2" color="text.secondary">
              You are logged in
            </Typography>
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{ textTransform: "none" }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6">Hello, Guest!</Typography>
            <Typography variant="body2" color="text.secondary">
              Please login or signup to access your account
            </Typography>
            <Button
              variant="contained"
              onClick={handleLogin}
              sx={{ textTransform: "none" }}
            >
              Login / Signup
            </Button>
          </>
        )}
      </Box>
    </Menu>
  );
}
