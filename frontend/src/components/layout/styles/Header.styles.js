import { AppBar as MuiAppBar } from '@mui/material';
import { styled } from '@mui/material/styles';

import { drawerWidth, headerHeight } from './Layout.styles.js';

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
        [theme.breakpoints.up('md')]: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
        },
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