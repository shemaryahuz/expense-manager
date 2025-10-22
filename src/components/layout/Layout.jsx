import { Box, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <Header />
      <Nav />
      <Container component="main">
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}
