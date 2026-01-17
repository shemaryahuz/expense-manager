import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, IconButton, Link, Toolbar, Typography } from "@mui/material";
import {
  AccountCircle,
  LightMode,
  MenuOpen,
  ModeNight,
  Paid,
  Translate,
} from "@mui/icons-material";

import { selectUser } from "../../features/user/userSlice.js";
import {
  selectThemeMode,
  toggleThemeMode,
} from "../../features/settings/settingsSlice.js";

import { useTranslation } from "../../hooks/i18n.js";

import AccountMenu from "../../pages/user/AccountMenu.jsx";
import CurrencyMenu from "./CurrencyMenu.jsx";
import LanguageMenu from "./LanguageMenu.jsx";

import { AppBar } from "./styles/Header.styles.js";

export default function Header({ drawerOpen, handleDrawerToggle }) {
  const dispatch = useDispatch();

  const { translate } = useTranslation();

  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
  const [currencyMenuAnchor, setCurrencyMenuAnchor] = useState(null);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null);

  const user = useSelector(selectUser);
  const themeMode = useSelector(selectThemeMode);

  const accountMenuOpen = Boolean(accountMenuAnchor);
  const currencyMenuOpen = Boolean(currencyMenuAnchor);
  const languageMenuOpen = Boolean(languageMenuAnchor);

  const handleToggleThemeMode = () => {
    dispatch(toggleThemeMode());
  };

  const handleAccountMenuOpen = ({ currentTarget }) =>
    setAccountMenuAnchor(currentTarget);

  const handleAccountMenuClose = () => setAccountMenuAnchor(null);

  const handleCurrencyMenuOpen = ({ currentTarget }) =>
    setCurrencyMenuAnchor(currentTarget);

  const handleCurrencyMenuClose = () => setCurrencyMenuAnchor(null);

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
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2, display: "flex" }}
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
            <Typography
              variant="h4"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              {translate("Expense Manager")}
            </Typography>
          </Link>

          <IconButton
            color="inherit"
            aria-label="theme-mode"
            onClick={handleToggleThemeMode}
          >
            {themeMode === "light" ? <ModeNight /> : <LightMode />}
          </IconButton>

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

          {user && (
            <>
              {" "}
              <IconButton
                color="inherit"
                aria-label="currency"
                onClick={handleCurrencyMenuOpen}
              >
                <Paid fontSize="large" />
              </IconButton>
              <CurrencyMenu
                open={currencyMenuOpen}
                anchorEl={currencyMenuAnchor}
                onClose={handleCurrencyMenuClose}
              />
            </>
          )}

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
