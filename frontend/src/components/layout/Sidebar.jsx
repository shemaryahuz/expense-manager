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
import { ChevronLeft } from "@mui/icons-material";

import { selectUser } from "../../features/user/userSlice.js";
import { ROUTES } from "../../constants/app/routes.js";

import { Drawer, DrawerTop } from "./styles/Sidebar.styles.js";

export default function Sidebar({ drawerOpen, handleDrawerClose }) {
  const location = useLocation();

  const user = useSelector(selectUser);

  return (
    <Drawer variant="permanent" open={drawerOpen}>
      <DrawerTop>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft sx={{ color: "#fff" }} />
        </IconButton>
      </DrawerTop>
      <Divider />

      <List>
        {ROUTES.map(({ path, name, Icon }) => (
          <ListItem key={name} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              disabled={!user}
              component={Link}
              to={path}
              selected={location.pathname === path}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText
                primary={name}
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
