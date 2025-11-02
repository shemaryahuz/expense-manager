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
import { Drawer, DrawerTop } from "./styles";
import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import TransactionIcon from "@mui/icons-material/ReceiptLong";
import ReportIcon from "@mui/icons-material/BarChart";

export default function Sidebar({ open, handleDrawerClose }) {
  const pages = [
    {
      text: "Login",
      href: "/",
      icon: <LoginIcon />,
    },
    {
      text: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      text: "Categories",
      href: "/categories",
      icon: <CategoryIcon />,
    },
    {
      text: "Transactions",
      href: "/transactions",
      icon: <TransactionIcon />,
    },
    {
      text: "Reports",
      href: "/reports",
      icon: <ReportIcon />,
    },
  ];
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerTop>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon sx={{color: '#fff'}}/>
        </IconButton>
      </DrawerTop>
      <Divider />
      
      <List>
        {pages.map((page) => (
          <ListItem key={page.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton component="a" href={page.href} selected={location.pathname === page.href}>
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
