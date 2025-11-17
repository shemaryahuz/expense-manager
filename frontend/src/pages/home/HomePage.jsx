import { Container, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h2"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
      >
        Welcome, user!
      </Typography>
    </Container>
  );
}
