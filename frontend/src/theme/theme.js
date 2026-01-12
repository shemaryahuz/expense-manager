import { createTheme } from "@mui/material";
import { teal } from "@mui/material/colors";

export const getTheme = (mode = "light", direction = "ltr") => createTheme({
    palette: {
        mode,
        direction,
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
    }
});
