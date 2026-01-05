const baseCard = {
  display: "flex",
  flexDirection: "column",
  gap: 3,
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
    maxWidth: 480,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    mt: 1,
    maxWidth: 480,
  },
  primaryButton: {
    textTransform: "none",
    alignSelf: "flex-start",
    mt: 1,
  },
};


