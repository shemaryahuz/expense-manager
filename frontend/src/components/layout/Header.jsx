import { Box, IconButton, Link, Toolbar, Typography } from "@mui/material";
import { AppBar } from "./styles/Header.styles.js";
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function Header({ open, handleDrawerOpen }) {
  const mode = 'light';
  const toggleColorMode = () => {};
  return (
    <AppBar component="header" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              marginRight: 5,
            },
            open && { display: "none" },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Link href="/" variant="contained">
          <Box component="img" src="/money-management.svg" alt="Logo" />
          <Typography variant="h4" component="span">Expense Manager</Typography>
        </Link>
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit" aria-label="toggle theme">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
