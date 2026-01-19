const baseCard = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "60%",
  gap: 2,
  bgcolor: "background.paper",
  p: 3,
  borderRadius: 3,
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
};

export const profileSectionStyles = {
  card: baseCard,
  narrowCard: {
    ...baseCard,
    gap: 2,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  primaryButton: {
    textTransform: "none",
  },
};


