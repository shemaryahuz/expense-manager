export const monthlyBudgetStyles = {
    container: {
        mt: 4,
        mb: 4,
    },
    gridItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        bgcolor: "background.paper",
        p: 2,
        borderRadius: 1,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        overflow: "hidden",
        wordWrap: "break-word",
        "& .MuiTypography-root": {
            wordBreak: "break-word",
            textAlign: "center",
            overflowWrap: "break-word",
        },
    },
    title: {
        fontWeight: "bold",
    },
}