import { AppBar, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

export default function Nav() {
  const pageLinks = [
    { title: "Login", path: "/" },
    { title: "Dashboard", path: "/dashboard" },
    { title: "Transactions", path: "/transactions" },
    { title: "Categories", path: "/categories" },
    { title: "Reports", path: "/reports" },
  ];

  return (
    <AppBar component="nav" position="static">
      <Toolbar>
        {pageLinks.map((link) => (
          <Button
            color="inherit"
            key={link.title + link.path}
            component={Link}
            to={link.path}
          >
            {link.title}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
}
