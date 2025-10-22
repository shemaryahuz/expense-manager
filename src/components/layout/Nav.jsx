import { AppBar, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

export default function Nav() {
  const pageLinks = [
    { title: "Dashboard", path: "/" },
    { title: "Expenses", path: "/expenses" },
    { title: "Credit Cards", path: "/credit-cards" },
    { title: "Budgets", path: "/budgets" },
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
