import { Box, Button } from "@mui/material";

import { CategoryCardStyles as styles } from "./styles/CategoryCard.styles";

export default function CategoryEditActions({ updatedName, onSave, onCancel }) {
  return (
    <Box sx={styles.editActions}>
      <Button onClick={onSave} disabled={!updatedName}>
        Save
      </Button>
      <Button onClick={onCancel}>Cancel</Button>
    </Box>
  );
}
