export const transactionsListStyles = {
    tableContainer: {
        width: "100%",
        maxWidth: "100%",
        mb: 4,
        borderRadius: 1,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        overflowX: "auto",
        overflowY: "visible",
        bgcolor: "background.paper",
        WebkitOverflowScrolling: "touch",
        "&::-webkit-scrollbar": {
            height: "8px",
        },
        "&::-webkit-scrollbar-track": {
            background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
            background: "#ccc",
            borderRadius: "4px",
        },
    },
    table: {
        minWidth: { xs: "100%", sm: 650 },
        width: "100%",
        tableLayout: { xs: "fixed", sm: "auto" },
    },
    tableHead: {
        "& .MuiTableCell-root": { 
            fontWeight: "bold",
            whiteSpace: { xs: "nowrap", sm: "normal" },
        }
    },
};
