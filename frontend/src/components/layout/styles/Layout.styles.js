export const headerHeight = 80;
export const drawerWidth = 240;

export const layoutStyles = {
    layout: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    pageContainer: {
        minHeight: "100vh",
        boxSizing: "border-box",

        marginTop: "4rem",

        marginBottom: "6rem",

        marginLeft: { sm: "15rem" },

        "[dir='rtl'] &": {
            marginLeft: 0,
            marginRight: { sm: "15rem" },
        },

        "@media (max-width: 900px)": {
            marginLeft: 0,
            marginRight: 0,
        },
    },
};

