import { Button } from "@mui/material";
import { CallMade } from "@mui/icons-material";

import { useTranslation } from "../../hooks/i18n";

export default function DashboardButton({ onClick }) {
  const { translate } = useTranslation();

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
      {translate("Dashboard")}
      <CallMade sx={{ fontSize: "small" }} />
    </Button>
  );
}
