import { Box } from "@mui/material";

import HomeHeader from "./HomeHeader";
import DashboardButton from "./DashboardButton";
import Feedback from "../../components/common/Feedback";

import { homePageStyles as styles } from "./styles/HomePage.styles";

export default function PrivateHome({
  name,
  showSuccess,
  successMessage,
  onClose,
  onNavigate,
}) {
  return (
    <Box sx={styles.mainBox}>
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
