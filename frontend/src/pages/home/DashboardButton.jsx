import { Button } from "@mui/material";
import { CallMade } from "@mui/icons-material";

export default function DashboardButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      size="large"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        textTransform: "none",
      }}
    >
      Go to Dashboard <CallMade sx={{ fontSize: "small" }} />
    </Button>
  );
}
