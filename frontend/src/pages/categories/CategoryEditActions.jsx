import { Box, Button } from "@mui/material";

import { useTranslation } from "../../hooks/i18n";

import { CategoryCardStyles as styles } from "./styles/CategoryCard.styles";

export default function CategoryEditActions({ updatedName, onSave, onCancel }) {
  const { translate } = useTranslation();

  return (
    <Box sx={styles.editActions}>
      <Button onClick={onSave} disabled={!updatedName}>
        {translate("Save")}
      </Button>
      <Button onClick={onCancel}>{translate("Cancel")}</Button>
    </Box>
  );
}
