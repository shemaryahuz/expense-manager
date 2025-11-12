import { Container, Typography } from "@mui/material";
import CategoryCard from "./CategoryCard";

export default function CategoriesGroupe({ name, categories }) {
  return (
    <Container
      sx={{
        width: "100%",
        maxWidth: "md",
        p: 2,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        {name}
      </Typography>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </Container>
  );
}
