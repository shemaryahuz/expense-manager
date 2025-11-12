import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Drawer, DrawerTop } from "./styles/Sidebar.styles.js";
import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import TransactionIcon from "@mui/icons-material/ReceiptLong";
import ReportIcon from "@mui/icons-material/BarChart";
import { useNavigate } from "react-router-dom";

const pages = [
  {
    text: "Login",
    path: "/",
    icon: <LoginIcon />,
  },
  {
    text: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    text: "Transactions",
    path: "/transactions",
    icon: <TransactionIcon />,
  },
  {
    text: "Categories",
    path: "/categories",
    icon: <CategoryIcon />,
  },
  {
    text: "Reports",
    path: "/reports",
    icon: <ReportIcon />,
  },
];

export default function Sidebar({ open, handleDrawerClose }) {
  const navigate = useNavigate();
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerTop>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon sx={{ color: "#fff" }} />
        </IconButton>
      </DrawerTop>
      <Divider />

      <List>
        {pages.map((page) => (
          <ListItem key={page.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component="a"
              onClick={() => navigate(page.path)}
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
