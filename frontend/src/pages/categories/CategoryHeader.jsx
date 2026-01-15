import { Box, TextField, Typography } from "@mui/material";

import { INCOME_ID } from "../../constants/features/categoriesConstants";

import { useTranslation } from "../../hooks/i18n";

import { CategoryCardStyles as styles } from "./styles/CategoryCard.styles";

export default function CategoryHeader({
  isEditing,
  updatedName,
  onNameChange,
  name,
  amount,
  id,
}) {
  const { translate } = useTranslation();

  return (
    <Box sx={styles.categoryHeader}>
      {isEditing ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexGrow: 1,
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <TextField
            variant="standard"
            autoFocus
            value={updatedName}
            onChange={onNameChange}
            sx={styles.editInput}
          />
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {id === INCOME_ID ? translate("Incomes") : translate(name)}
          </Typography>

          {amount > 0 && (
            <Typography
              variant="h6"
              sx={{
                color: id === INCOME_ID ? "green" : "red",
                display: "flex",
                alignItems: "center",
              }}
            >
              {id === INCOME_ID ? "+ " : "- "}${amount}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
