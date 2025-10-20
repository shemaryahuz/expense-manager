import { Box, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout() {
  return (
    
    /*Layout with header, footer and page content in between */
    <Grid container>
      <Header />
      <Nav />  
      <Box component="main">
        <Outlet /> {/* page content goes here per route */}
      </Box>
      <Footer />
    </Grid>
  );
}
