import { styled } from '@mui/material/styles';
import { Drawer as MuiDrawer } from '@mui/material';

import { drawerWidth, headerHeight } from './Layout.styles.js';

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

export const DrawerTop = styled("div")(({ theme }) => ({
    height: headerHeight,
    display: "flex",
    alignItems: "center",
    justifyContent: theme.direction === "rtl" ? "flex-start" : "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open', })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
        },
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
        }),
    }),
);