import { Box, Typography } from "@mui/material";

export default function HomeHeader({ name }) {
  return (
    <Box sx={{ mt: 4, mb: 2 }}>
    <Typography
      variant="h4"
      gutterBottom
      sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
    >
      Welcome back, {name ?? "User"}!
    </Typography>
    <Typography variant="subtitle1" sx={{ textAlign: "center", color: "text.secondary" }}>
      Track your expenses and manage your budget effectively.
    </Typography>
  </Box>
)}
