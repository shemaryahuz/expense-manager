export const transactionsPageStyles = {
  heading: {
    mb: 2,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    px: { xs: 1, sm: 0 },
  },
  mainBox: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    mb: 2,
    width: "100%",
  },
  headerBox: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    alignItems: { xs: "stretch", sm: "center" },
    gap: { xs: 2, sm: 0 },
  },
  searchBox: {
    display: "flex",
    gap: 1,
  },
  addButton: {
    textTransform: "none",
  },
  addIcon: {
    ml: 1,
  },
};