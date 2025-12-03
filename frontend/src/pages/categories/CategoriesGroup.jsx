import { useState } from "react";

import { Box, Button, Container, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

import { GROUP_NAMES } from "../../constants/features/categoriesConstants";

import CategoryCard from "./CategoryCard";
import AddCategoryForm from "./AddCategoryForm";

import { CategoriesGroupStyles as styles } from "./styles/CategoriesGroup.styles";

const { CUSTOM } = GROUP_NAMES;

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
      sx={styles.container}
    >
      <Box
        sx={styles.mainBox}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>
        {name === CUSTOM && (
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
