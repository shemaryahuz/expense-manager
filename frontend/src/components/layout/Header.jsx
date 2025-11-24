import { useState } from "react";

import { Box, IconButton, Link, Toolbar, Typography } from "@mui/material";

import { Menu, AccountCircle } from "@mui/icons-material";

import { AppBar } from "./styles/Header.styles.js";

import AccountMenu from "../../pages/user/AccountMenu.jsx";

export default function Header({ open, handleDrawerOpen }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const accountMenuOpen = Boolean(anchorEl);

  const handleAccountMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

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
        <IconButton
          sx={{ ml: 1 }}
          color="inherit"
          aria-label="account"
          onClick={handleAccountMenuOpen}
        >
          <AccountCircle fontSize="large" />
        </IconButton>
        <AccountMenu
          open={accountMenuOpen}
          anchorEl={anchorEl}
          onClose={handleAccountMenuClose}
        />
      </Toolbar>
    </AppBar>
  );
}
