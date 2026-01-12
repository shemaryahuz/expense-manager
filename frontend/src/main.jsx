import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material";

import axios from "axios";

import store from "./app/store";
import App from "./App.jsx";
import { getTheme } from "./theme/theme";
import {
  selectDirection,
  selectThemeMode,
} from "./features/settings/settingsSlice.js";

import { BASE_URL } from "./constants/api/urlConstants.js";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

function AppWithTheme() {
  const themeMode = useSelector(selectThemeMode);
  const direction = useSelector(selectDirection);
  
  const theme = getTheme(themeMode, direction);

  useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <AppWithTheme />
    </ReduxProvider>
  </StrictMode>
);
