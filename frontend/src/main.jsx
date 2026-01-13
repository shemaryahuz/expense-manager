import { StrictMode, useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";

import axios from "axios";

import store from "./app/store";
import App from "./App.jsx";
import { getTheme } from "./theme/theme";
import {
  selectDirection,
  selectThemeMode,
} from "./features/settings/settingsSlice.js";
import { createRtlCache, createLtrCache } from "./theme/rtlCache.js";

import { BASE_URL } from "./constants/api/urlConstants.js";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

function AppWithTheme() {
  const themeMode = useSelector(selectThemeMode);
  const direction = useSelector(selectDirection);

  const cache = useMemo(() => direction === "rtl" ? createRtlCache() : createLtrCache(), [direction]);

  const theme = useMemo(() => getTheme(themeMode, direction), [themeMode, direction]);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </CacheProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <AppWithTheme />
    </ReduxProvider>
  </StrictMode>
);
