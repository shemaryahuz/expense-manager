import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Box, CssBaseline } from "@mui/material";

import { layoutStyles as styles } from "./styles/Layout.styles.js";
import { DrawerHeader } from "./styles/Header.styles.js";

import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

export default function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const handleDrawerOpen = () => setDrawerOpen(true);

  const handleDrawerClose = () => setDrawerOpen(false);

  return (
    <Box sx={styles.layout}>
      <CssBaseline />
      <Header drawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen} />
      <Box>
        <Sidebar
          drawerOpen={drawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
        <Box component="main" sx={styles.content}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
