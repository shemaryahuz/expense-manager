import { useState } from "react";

import { Box, Button, Container, Typography } from "@mui/material";

import { Add } from "@mui/icons-material";

import CategoryCard from "./CategoryCard";
import AddCategoryForm from "./AddCategoryForm";

import { GROUP_NAMES } from "../../constants/features/categoriesConstants";

const { INCOME } = GROUP_NAMES;

export default function CategoriesGroupe({ name, categories }) {
  const [addOpen, setAddOpen] = useState(false);

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  return (
    <Container
      sx={{
        width: "100%",
        maxWidth: "md",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>
        {name === INCOME && (
          <Button
            startIcon={<Add />}
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={handleAddOpen}
          >
            Add Category
          </Button>
        )}
      </Box>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
      <AddCategoryForm open={addOpen} onClose={handleAddClose} />
    </Container>
  );
}
