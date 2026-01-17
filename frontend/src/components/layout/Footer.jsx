import { Link, Typography, Box } from "@mui/material";

import { StyledFooter } from "./styles/Footer.styles.js";

import { useTranslation } from "../../hooks/i18n.js";

export default function Footer() {
  const { translate } = useTranslation();

  return (
    <StyledFooter component="footer">
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body2">&copy;</Typography>
        <Link
          variant="body2"
          href="https://github.com/shemaryahuz"
          target="_blank"
        >
          {translate("Shemaryahu Zelmanov")}
        </Link>
      </Box>
    </StyledFooter>
  );
}
