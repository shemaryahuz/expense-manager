import { useState } from "react";

import { Box, IconButton, Link, Toolbar, Typography } from "@mui/material";
import {
  AccountCircle,
  MenuOpen,
  Settings,
  Translate,
} from "@mui/icons-material";

import { AppBar } from "./styles/Header.styles.js";
import AccountMenu from "../../pages/user/AccountMenu.jsx";

import { useTranslation } from "../../hooks/i18n.js";
import SettingsMenu from "./SettingsMenu.jsx";
import LanguageMenu from "./LanguageMenu.jsx";

export default function Header({ drawerOpen, handleDrawerOpen }) {
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
  const [settingsMenuAnchor, setSettingsMenuAnchor] = useState(null);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null);

  const { translate } = useTranslation();

  const accountMenuOpen = Boolean(accountMenuAnchor);
  const settingsMenuOpen = Boolean(settingsMenuAnchor);
  const languageMenuOpen = Boolean(languageMenuAnchor);

  const handleAccountMenuOpen = ({ currentTarget }) =>
    setAccountMenuAnchor(currentTarget);

  const handleAccountMenuClose = () => setAccountMenuAnchor(null);

  const handleSettingsMenuOpen = ({ currentTarget }) =>
    setSettingsMenuAnchor(currentTarget);

  const handleSettingsMenuClose = () => setSettingsMenuAnchor(null);

  const handleLanguageMenuOpen = ({ currentTarget }) =>
    setLanguageMenuAnchor(currentTarget);

  const handleLanguageMenuClose = () => setLanguageMenuAnchor(null);

  return (
    <AppBar component="header" position="fixed" open={drawerOpen}>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            direction: "ltr",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(drawerOpen && { display: "none" }) }}
          >
            <MenuOpen />
          </IconButton>

          <Link
            href="/"
            underline="none"
            color="inherit"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexGrow: 1,
            }}
          >
            <Box
              component="img"
              src="/images/money-management.svg"
              alt="Logo"
              sx={{ height: 40 }}
            />
            <Typography variant="h4">{translate("appName")}</Typography>
          </Link>

          <IconButton
            color="inherit"
            aria-label="language"
            onClick={handleLanguageMenuOpen}
          >
            <Translate />
          </IconButton>
          <LanguageMenu
            open={languageMenuOpen}
            anchorEl={languageMenuAnchor}
            onClose={handleLanguageMenuClose}
          />

          <IconButton
            color="inherit"
            aria-label="settings"
            onClick={handleSettingsMenuOpen}
          >
            <Settings fontSize="large" />
          </IconButton>
          <SettingsMenu
            open={settingsMenuOpen}
            anchorEl={settingsMenuAnchor}
            onClose={handleSettingsMenuClose}
          />

          <IconButton
            color="inherit"
            aria-label="account"
            onClick={handleAccountMenuOpen}
          >
            <AccountCircle fontSize="large" />
          </IconButton>
          <AccountMenu
            open={accountMenuOpen}
            anchorEl={accountMenuAnchor}
            onClose={handleAccountMenuClose}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
