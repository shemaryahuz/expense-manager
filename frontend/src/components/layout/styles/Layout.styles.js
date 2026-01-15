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
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
        overflowY: "auto",

        marginTop: "4rem",

        marginBottom: "6rem",

        marginLeft: { md: "15rem" },

        "[dir='rtl'] &": {
            marginLeft: 0,
            marginRight: { md: "15rem" },
        },

        "@media (max-width: 900px)": {
            marginLeft: 0,
            marginRight: 0,
        },
    },
};

