import { Box, IconButton, Link, Toolbar, Typography } from "@mui/material";

import { Menu, Brightness4, Brightness7 } from "@mui/icons-material";

import { AppBar } from "./styles/Header.styles.js";

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
          <Menu />
        </IconButton>
        <Link href="/" variant="contained">
          <Box component="img" src="/money-management.svg" alt="Logo" />
          <Typography variant="h4" component="span">Expense Manager</Typography>
        </Link>
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit" aria-label="toggle theme">
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
