import { Box, IconButton, Link, Toolbar, Typography } from "@mui/material";

import { Menu, AccountCircle } from "@mui/icons-material";

import { AppBar } from "./styles/Header.styles.js";

export default function Header({ open, handleDrawerOpen }) {
  return (
    <AppBar component="header" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              marginRight: 5,
            },
            open && { visibility: "hidden" },
          ]}
        >
          <Menu />
        </IconButton>
        <Link href="/" variant="contained">
          <Box component="img" src="/money-management.svg" alt="Logo" />
          <Typography variant="h4" component="span">
            Expense Manager
          </Typography>
        </Link>
        <IconButton sx={{ ml: 1 }} color="inherit" aria-label="account">
          <AccountCircle fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
