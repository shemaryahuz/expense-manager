import { createTheme } from "@mui/material";
import { teal } from "@mui/material/colors";


const theme = createTheme({
    palette: {
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
        background: {
            default: teal[50],
            paper: "#fff",
        },
    }
});

export default theme;
