import { Link, Typography } from "@mui/material";
import { StyledFooter } from "./styles/Footer.styles.js";

export default function Footer() {
  return (
    <StyledFooter component="footer">
      <Typography>
        &copy; 2025 by{" "}
        <Link
          href="https://github.com/shemaryahuz"
          target="_blank"
        >
          Shemaryahu Zalmanov
        </Link>
      </Typography>
    </StyledFooter>
  );
}
