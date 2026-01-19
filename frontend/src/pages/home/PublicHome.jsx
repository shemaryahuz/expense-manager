import { useState } from "react";

import { Box, Typography, Button } from "@mui/material";

import { useTranslation } from "../../hooks/i18n";
import LoginForm from "../../pages/user/LoginForm";

import { homePageStyles as styles } from "./styles/HomePage.styles";

export default function PublicHome() {
  const [loginFormOpen, setLoginFormOpen] = useState(false);

  const { translate } = useTranslation();

  const handleOpenLoginForm = () => setLoginFormOpen(true);
  const handleCloseLoginForm = () => setLoginFormOpen(false);

  return (
    <Box sx={styles.mainBox}>
      <Typography variant="h3" sx={{ fontWeight: "bold" }}>
        {translate("Welcome to Expense Manager")}
      </Typography>
      <Typography variant="h6">
        {translate(
          "Track your expenses, manage categories, and understand your financial life"
        )}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {translate("Please login or signup to access your account")}
      </Typography>
      <Button
        variant="contained"
        onClick={handleOpenLoginForm}
        sx={{ textTransform: "none" }}
      >
        {translate("Log in")} / {translate("Sign up")}
      </Button>
      <LoginForm open={loginFormOpen} onClose={handleCloseLoginForm} />
    </Box>
  );
}
