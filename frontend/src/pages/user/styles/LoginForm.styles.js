export const loginFormStyles = {
    container: {
        "& .MuiDialog-paper": {
            width: "90%",
            maxWidth: 380,
            minWidth: 300,

            margin: 0,
            padding: "24px",

            borderRadius: 5,
            boxShadow: "0px 8px 24px rgba(0,0,0,0.18)",

            boxSizing: "border-box",
        },
    },

    title: {
        textAlign: "center",
        fontWeight: 600,
        mb: 1,
    },

    subTitle: {
        textAlign: "center",
        color: "text.secondary",
        mb: 3,
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
    },

    input: {
        width: "100%",
    },

    submitButton: {
        textTransform: "none",
        mt: 2,
        py: 1.2,
        fontWeight: 600,
    },

    switchText: {
        textAlign: "center",
        mt: 2,
        color: "text.secondary",
    },

    switchButton: {
        alignSelf: "center",
        mt: 1,
        textTransform: "none",
    },
};
