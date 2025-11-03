import { useState } from "react";
import Box from "@mui/material/Box";
import {
  contentStyle,
  layoutStyle,
  mainBoxStyle,
} from "./styles/Layout.styles.js";
import { DrawerHeader } from "./styles/Header.styles.js";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

export default function Layout() {

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={layoutStyle}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Box sx={mainBoxStyle}>
        <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
        <Box component="main" sx={contentStyle}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
