import { Box, CircularProgress, Divider, Typography } from "@mui/material";

export default function Loader() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography>Loading...</Typography>
      <Divider />
      <CircularProgress />
    </Box>
  );
}
