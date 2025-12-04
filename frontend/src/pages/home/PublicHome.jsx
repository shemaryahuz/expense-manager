import { Box, Typography } from "@mui/material";
import LoginForm from "../user/LoginForm";

export default function PublicHome() {
  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
      >
        Welcome to Expense Manager!
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{ textAlign: "center", mb: 2, mt: 2 }}
      >
        Track your expenses, manage categories, and understand your financial
        life.
      </Typography>
      <LoginForm />
    </Box>
  );
}
