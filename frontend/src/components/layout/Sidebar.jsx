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
  Drawer as MuiDrawer,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

import { selectDirection } from "../../features/settings/settingsSlice.js";
import { selectUser } from "../../features/user/userSlice.js";

import { ROUTES } from "../../constants/app/routes.js";
import { DIRECTIONS } from "../../constants/features/settingsConstants.js";
import { useTranslation } from "../../hooks/i18n.js";

import { Drawer, DrawerTop } from "./styles/Sidebar.styles.js";
import { drawerWidth } from "./styles/Layout.styles.js";

const { RTL } = DIRECTIONS;

export default function Sidebar({
  drawerOpen,
  handleDrawerToggle,
  isMobile = false,
}) {
  const location = useLocation();

  const { translate } = useTranslation();

  const direction = useSelector(selectDirection);
  const user = useSelector(selectUser);

  const DrawerComponent = isMobile ? MuiDrawer : Drawer;

  return (
    <DrawerComponent
      variant={isMobile ? "temporary" : "permanent"}
      open={drawerOpen}
      onClose={handleDrawerToggle}
      ModalProps={
        isMobile && {
          keepMounted: true,
        }
      }
      sx={
        isMobile && {
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }
      }
    >
      <DrawerTop>
        <IconButton onClick={handleDrawerToggle} sx={{ color: "#fff" }}>
          {direction === RTL ? <ChevronRight /> : <ChevronLeft />}
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
              onClick={isMobile && handleDrawerToggle}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={translate(name)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </DrawerComponent>
  );
}
