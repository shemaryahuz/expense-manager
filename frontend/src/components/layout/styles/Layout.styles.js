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
        overflowX: "hidden",
        overflowY: "auto",

        marginTop: "4rem",
        marginBottom: "6rem",

        paddingInlineStart: { md: `${drawerWidth}px` },
        width: { md: `calc(100% - ${drawerWidth}px)` },

        "[dir='rtl'] &": {
            paddingInlineStart: 0,
            paddingInlineEnd: { md: `${drawerWidth}px` },
            width: { md: `calc(100% - ${drawerWidth}px)` },
        },

        "@media (max-width: 900px)": {
            paddingInlineStart: 0,
            paddingInlineEnd: 0,
            width: "100%",
        },
    },
};

