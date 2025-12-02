import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

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
  Home,
  Dashboard,
  Category,
  ReceiptLong,
} from "@mui/icons-material";

import { Drawer, DrawerTop } from "./styles/Sidebar.styles.js";

import { selectUserState } from "../../features/user/userSlice.js";

const pages = [
  {
    text: "Home",
    path: "/",
    icon: <Home />,
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
];

export default function Sidebar({ drawerOpen, handleDrawerClose }) {
  const location = useLocation();

  const { isAuthenticated } = useSelector(selectUserState);

  return (
    <Drawer variant="permanent" open={drawerOpen}>
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
              disabled={!isAuthenticated}
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
                  {
                    opacity: drawerOpen ? 1 : 0,
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
