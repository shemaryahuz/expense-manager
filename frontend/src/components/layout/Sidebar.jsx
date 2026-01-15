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
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

import { selectDirection } from "../../features/settings/settingsSlice.js";
import { selectUser } from "../../features/user/userSlice.js";
import { useTranslation } from "../../hooks/i18n.js";

import { ROUTES } from "../../constants/app/routes.js";

import { Drawer, DrawerTop } from "./styles/Sidebar.styles.js";
import { Drawer as MuiDrawer } from "@mui/material";
import { drawerWidth } from "./styles/Layout.styles.js";

export default function Sidebar({
  drawerOpen,
  handleDrawerToggle,
  isMobile = false,
}) {
  const location = useLocation();

  const { translate } = useTranslation();

  const direction = useSelector(selectDirection);
  const user = useSelector(selectUser);

  if (isMobile) {
    return (
      <MuiDrawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <DrawerTop>
          <IconButton onClick={handleDrawerToggle} sx={{ color: "#fff" }}>
            {direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerTop>

        <Divider />

        <List>
          {ROUTES.map(({ path, name, Icon }) => (
            <ListItem key={name} disablePadding>
              <ListItemButton
                disabled={!user}
                component={Link}
                to={path}
                selected={location.pathname === path}
                onClick={handleDrawerToggle}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={translate(name)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </MuiDrawer>
    );
  }

  return (
    <Drawer variant="permanent" open={drawerOpen}>
      <DrawerTop>
        <IconButton onClick={handleDrawerToggle} sx={{ color: "#fff" }}>
          {direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerTop>

      <Divider />

      <List>
        {ROUTES.map(({ path, name, Icon }) => (
          <ListItem key={name} disablePadding>
            <ListItemButton
              disabled={!user}
              component={Link}
              to={path}
              selected={location.pathname === path}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={translate(name)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
