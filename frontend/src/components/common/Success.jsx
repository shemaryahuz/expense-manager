import { Alert, Typography } from "@mui/material";

export default function Success({ message }) {
  return (
    <Alert
      severity="success"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 2,
        mb: 2,
        p: 2,
        borderRadius: 3,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Typography variant="body1">{message}</Typography>
    </Alert>
  );
}
