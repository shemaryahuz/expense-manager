import { useMemo } from "react";
import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";

import { getTheme } from "../theme/theme";
import { createRtlCache, createLtrCache } from "../theme/rtlCache";

import {
  selectDirection,
  selectThemeMode,
} from "../features/settings/settingsSlice";

import { DIRECTIONS } from "../constants/features/settingsConstants";

import App from "../App.jsx";

const { RTL } = DIRECTIONS;

export default function AppProviders() {
  const themeMode = useSelector(selectThemeMode);
  const direction = useSelector(selectDirection);

  const cache = useMemo(
    () => (direction === RTL ? createRtlCache() : createLtrCache()),
    [direction]
  );

  const theme = useMemo(
    () => getTheme(themeMode, direction),
    [themeMode, direction]
  );

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </CacheProvider>
  );
}
