export const monthHeaderStyles = {
    headerBox: {
        width: { xs: "100%", sm: "80%", md: "60%" },
        mx: "auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
        p: { xs: 1, sm: 2 },
        gap: { xs: 1, sm: 2 },
        bgcolor: "background.paper",
        borderRadius: 5,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        "& .MuiTextField-root": {
            flex: 1,
            minWidth: 0,
        },
        "& .MuiInputBase-root": {
            fontSize: { xs: "0.875rem", sm: "1rem" },
        },
    },
};
