import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Button, Menu, Typography } from "@mui/material";

import LoginForm from "./LoginForm";

import { selectUser, selectUserName } from "../../features/user/userSlice";
import { logout } from "../../features/user/userThunks";
import { useTranslation } from "../../hooks/i18n";

import { USER, GUEST } from "../../constants/ui/userConstants";
import { ROUTE_PATHS } from "../../constants/app/routes";

const { HOME, PROFILE } = ROUTE_PATHS;

export default function AccountMenu({ open, anchorEl, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { translate } = useTranslation();

  const [loginFormOpen, setLoginFormOpen] = useState(false);

  const user = useSelector(selectUser);
  const name = useSelector(selectUserName) || translate(USER);

  const handleOpenLoginForm = () => {
    setLoginFormOpen(true);
    onClose();
  };

  const handleCloseLoginForm = () => setLoginFormOpen(false);

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
    <>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        closeAfterTransition={false}
      >
        <Box
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          {user ? (
            <>
              <Typography variant="h6">{name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {translate("You are logged in")}
              </Typography>
              <Button
                variant="outlined"
                onClick={handleOpenProfile}
                sx={{ textTransform: "none" }}
              >
                {translate("Account Settings")}
              </Button>
              <Button
                variant="contained"
                onClick={handleLogout}
                sx={{ textTransform: "none" }}
              >
                {translate("Log out")}
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6">{translate(GUEST)}</Typography>
              <Typography variant="body2" color="text.secondary">
                {translate("Please login or signup to access your account")}
              </Typography>
              <Button
                variant="contained"
                onClick={handleOpenLoginForm}
                sx={{ textTransform: "none" }}
              >
                {translate("Log in")} / {translate("Sign up")}
              </Button>
            </>
          )}
        </Box>
      </Menu>

      <LoginForm open={loginFormOpen} onClose={handleCloseLoginForm} />
    </>
  );
}
