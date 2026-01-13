import { AppBar as MuiAppBar } from '@mui/material';
import { styled } from '@mui/material/styles';

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
    '& .MuiBox-root': {
        flexDirection: 'row',
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
