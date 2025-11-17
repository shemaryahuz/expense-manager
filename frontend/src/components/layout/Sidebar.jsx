import { Link, useLocation } from "react-router-dom";

import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {
  ChevronLeft,
  Login,
  Dashboard,
  Category,
  ReceiptLong,
  Report,
} from "@mui/icons-material";

import { Drawer, DrawerTop } from "./styles/Sidebar.styles.js";

const pages = [
  {
    text: "Login",
    path: "/",
    icon: <Login />,
  },
  {
    text: "Dashboard",
    path: "/dashboard",
    icon: <Dashboard />,
  },
  {
    text: "Transactions",
    path: "/transactions",
    icon: <ReceiptLong />,
  },
  {
    text: "Categories",
    path: "/categories",
    icon: <Category />,
  },
  {
    text: "Reports",
    path: "/reports",
    icon: <Report />,
  },
];

export default function Sidebar({ open, handleDrawerClose }) {
  const location = useLocation();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerTop>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft sx={{ color: "#fff" }} />
        </IconButton>
      </DrawerTop>
      <Divider />

      <List>
        {pages.map((page) => (
          <ListItem key={page.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to={page.path}
              selected={location.pathname === page.path}
            >
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText
                primary={page.text}
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
