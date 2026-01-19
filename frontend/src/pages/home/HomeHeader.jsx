import { Box, Typography } from "@mui/material";

import { useTranslation } from "../../hooks/i18n";

export default function HomeHeader({ name }) {
  const { translate } = useTranslation();

  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Box>
        <Typography gutterBottom variant="h3" sx={{ fontWeight: "bold" }}>
          {translate("Welcome")}
        </Typography>
        <Typography gutterBottom variant="h3" sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>
      </Box>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", color: "text.secondary" }}
      >
        {translate(
          "Track your expenses, manage categories, and understand your financial life"
        )}
      </Typography>
    </Box>
  );
}
