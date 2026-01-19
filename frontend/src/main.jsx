import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";

import store from "./app/store";
import AppProviders from "./providers/AppProviders";

import "./api/axios.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <AppProviders />
    </ReduxProvider>
  </StrictMode>
);
