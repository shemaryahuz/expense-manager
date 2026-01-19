import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material";

import { layoutStyles as styles } from "./styles/Layout.styles.js";
import { DrawerHeader } from "./styles/Header.styles.js";

import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const initialized = useRef(false);

  // initialize state: open on desktop, closed on mobile
  // default to true (desktop/open), will be corrected in useEffect
  const [drawerOpen, setDrawerOpen] = useState(true);

  useEffect(() => {
    // set initial state based on screen size only on first render
    if (!initialized.current) {
      setDrawerOpen(!isMobile);
      initialized.current = true;
    }
  }, [isMobile]);

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  return (
    <Box sx={styles.layout}>
      <CssBaseline />
      <Header drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
      <Box>
        <Sidebar
          drawerOpen={drawerOpen}
          handleDrawerToggle={handleDrawerToggle}
          isMobile={isMobile}
        />
        <Box component="main" sx={styles.pageContainer}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
