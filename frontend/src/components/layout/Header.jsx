import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, IconButton, Link, Toolbar, Typography } from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness7,
  Brightness4,
} from "@mui/icons-material";

import { AppBar } from "./styles/Header.styles.js";
import AccountMenu from "../../pages/user/AccountMenu.jsx";

import {
  selectThemeMode,
  toggleThemeMode,
} from "../../features/settings/settingsSlice.js";

export default function Header({ drawerOpen, handleDrawerOpen }) {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const accountMenuOpen = Boolean(anchorEl);

  const themeMode = useSelector(selectThemeMode);

  const handleThemeModeToggle = () => {
    dispatch(toggleThemeMode());
  };

  const handleAccountMenuOpen = ({ currentTarget }) =>
    setAnchorEl(currentTarget);

  const handleAccountMenuClose = () => setAnchorEl(null);

  return (
    <AppBar component="header" open={drawerOpen}>
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
            drawerOpen && { visibility: "hidden" },
          ]}
        >
          <Menu />
        </IconButton>
        <Link href="/" variant="contained">
          <Box component="img" src="/images/money-management.svg" alt="Logo" />
          <Typography variant="h4" component="span">
            Expense Manager
          </Typography>
        </Link>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            color="inherit"
            aria-label="toggle theme"
            onClick={handleThemeModeToggle}
            sx={{ ml: 1 }}
          >
            {themeMode === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
          <IconButton
            sx={{ ml: 1 }}
            color="inherit"
            aria-label="account"
            onClick={handleAccountMenuOpen}
          >
            <AccountCircle fontSize="large" />
          </IconButton>
        </Box>
        <AccountMenu
          open={accountMenuOpen}
          anchorEl={anchorEl}
          onClose={handleAccountMenuClose}
        />
      </Toolbar>
    </AppBar>
  );
}
