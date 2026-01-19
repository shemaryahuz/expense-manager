export const dashboardStyles = {
    heading: {
        mb: 2,
        fontWeight: "bold",
        textAlign: "center",
        width: "100%",
        px: { xs: 1, sm: 0 },
    },
    cardsBox: {
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        justifyContent: "center",
        mt: 2,
    },
    card: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        minWidth: 200,
        maxWidth: 400,
        flexGrow: 1,
        bgcolor: "background.paper",
        borderRadius: 1,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    cardTitle: {
        fontWeight: "bold",
        textAlign: "center",
    },
    cardButton: {
        mt: 2,
        textTransform: "none",
    },
    transactionItem: {
        display: "flex",
        justifyContent: "space-between",
        mt: 1
    },
    categoryItem: {
        display: "flex",
        justifyContent: "space-between",
        mb: 1,
        mt: 1,
    },
    categoryAmount: {
        display: "flex",
        alignItems: "center",
        color: "red",
    },
};