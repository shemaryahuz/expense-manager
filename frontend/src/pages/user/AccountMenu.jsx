import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Button, Menu, Typography } from "@mui/material";

import { selectUser, selectUserName } from "../../features/user/userSlice";
import { logout } from "../../features/user/userThunks";

import { USER, GUEST } from "../../constants/ui/userConstants";
import { ROUTE_PATHS } from "../../constants/app/routes";

const { HOME, PROFILE } = ROUTE_PATHS;

export default function AccountMenu({ open, anchorEl, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const name = useSelector(selectUserName) || USER;

  const handleLogin = () => {
    navigate(HOME);
    onClose();
  };

  const handleOpenProfile = () => {
    navigate(PROFILE);
    onClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(HOME);
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
        {user ? (
          <>
            <Typography variant="h6">Hello, {name}!</Typography>
            <Typography variant="body2" color="text.secondary">
              You are logged in
            </Typography>
            <Button
              variant="outlined"
              onClick={handleOpenProfile}
              sx={{ textTransform: "none" }}
            >
              Account settings
            </Button>
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
            <Typography variant="h6">Hello, {GUEST}!</Typography>
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
