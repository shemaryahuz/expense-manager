export const CategoryCardStyles = {
    accordion: {
        position: "relative",
    },
    accordionDetails: {
        width: "100%",
        maxWidth: "md"
    },
    categoryHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    editInput: {
        "& .MuiInputBase-input": {
            typography: "h5",
            fontWeight: "bold",
        },
    },
    editActions: {
        display: "flex",
        gap: 1,
        mb: 2,
    },
    categoryMenu: {
        display: "flex",
        mb: 1
    },
    menuItem: {
        display: "flex",
        gap: 1
    },
    deleteButton: {
        color: "error.dark",
        "&:hover": {
            bgcolor: "#fef0ecff"
        }
    }

}