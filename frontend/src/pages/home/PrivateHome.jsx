import { Box } from "@mui/material";
import HomeHeader from "./HomeHeader";
import DashboardButton from "./DashboardButton";
import Feedback from "../../components/common/Feedback";

export default function PrivateHome({
  name,
  showSuccess,
  successMessage,
  onClose,
  onNavigate,
}) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <HomeHeader name={name} />
      <Feedback
        open={showSuccess}
        onClose={onClose}
        severity="success"
        message={successMessage}
      />
      <DashboardButton onClick={onNavigate} />
    </Box>
  );
}
