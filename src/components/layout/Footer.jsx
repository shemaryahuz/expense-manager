import { Box, Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" bgcolor="#1976d2" mt="auto">
      <Typography align="center" sx={{ py: 2, color: "white" }}>
        &copy; 2025 by{" "}
        <Link
          href="https://github.com/shemaryahuz"
          target="_blank"
          sx={{ color: "blue", fontWeight: "bold", textDecoration: "none" }}
        >
          Shemaryahu Zalmanov
        </Link>
      </Typography>
    </Box>
  );
}
