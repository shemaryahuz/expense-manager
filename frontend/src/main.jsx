import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider } from "@mui/material";

import axios from 'axios';

import theme from "./theme/theme";
import store from "./app/store";
import App from './App.jsx'

import { BASE_URL } from './constants/api/urlConstants.js';

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </ThemeProvider>
  </StrictMode>,
)
