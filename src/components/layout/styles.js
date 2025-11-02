import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { collapseClasses } from '@mui/material';

const headerHeight = 80;
const drawerWidth = 240;

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

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    height: headerHeight,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    padding: theme.spacing(1),
    '& .MuiToolbar-root, & .MuiToolbar-root *': {
        color: 'inherit',
    },
    '& .MuiToolbar-root': {
        justifyContent: 'space-between',
    },
    '& a': {
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
    '& img': {
        height: '40px',
    },
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export const DrawerTop = styled("div")(({ theme }) => ({
    height: headerHeight,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
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

export const layoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
};

export const contentStyle = {
    flexGrow: 1,
    padding: '3rem',
};

export const StyledFooter = styled(MuiAppBar)(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    top: 'auto',
    width: '100%',
    height: '64px',
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiTypography-root': {
        '& a': {
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
                color: theme.palette.secondary.dark,
            }
        }
    },
    zIndex: theme.zIndex.drawer + 1,
}));