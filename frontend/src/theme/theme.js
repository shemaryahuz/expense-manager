import { createTheme } from "@mui/material";
import { teal } from "@mui/material/colors";

const LTR_FONT = `"Inter", "SF Pro Display", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif`;
const RTL_FONT = `"Rubik", "Heebo", "Assistant", "Arimo", "Arial", sans-serif`;

export const getTheme = (mode = "light", direction = "ltr") => createTheme({
    direction,
    typography: {
        fontFamily: direction === "rtl" ? RTL_FONT : LTR_FONT,

        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 500 },
        h6: { fontWeight: 500 },

        body1: { fontWeight: 400 },
        body2: { fontWeight: 400 },
        button: {
            fontWeight: 500,
            textTransform: "none",
        },
    },
    palette: {
        mode,
        primary: {
            main: teal[500],
            light: teal[300],
            dark: teal[700],
            contrastText: "#fff",
        },
        secondary: {
            main: teal[700],
            light: teal[400],
            dark: teal[900],
            contrastText: "#fff",
        },
        ...(mode === "light")
            ? {
                background: {
                    default: teal[50],
                    paper: "#fff",
                },
            }
            : {
                background: {
                    default: "#000",
                    paper: "#121212",
                },
                text: {
                    primary: "#fff",
                    secondary: "rgba(255, 255, 255, 0.7)",
                },
            },
    },
});
