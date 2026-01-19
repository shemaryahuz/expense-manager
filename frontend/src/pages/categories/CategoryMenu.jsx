import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { Delete, Edit, MoreVert } from "@mui/icons-material";

import { useTranslation } from "../../hooks/i18n";

import { CategoryCardStyles as styles } from "./styles/CategoryCard.styles";

export default function CategoryMenu({
  anchorEl,
  menuOpen,
  onMenuClick,
  onMenuClose,
  onEdit,
  onDeleteOpen,
}) {
  const { translate } = useTranslation();

  return (
    <Box sx={styles.categoryMenu}>
      <Button
        variant="contained"
        startIcon={<MoreVert />}
        onClick={onMenuClick}
        sx={{ gap: 1 }}
      >
        <Typography>{translate("Actions")}</Typography>
      </Button>

      <Menu anchorEl={anchorEl} open={menuOpen} onClose={onMenuClose}>
        <MenuItem onClick={onEdit} sx={styles.menuItem}>
          <Edit />
          <Typography>{translate("Rename category")}</Typography>
        </MenuItem>

        <MenuItem onClick={onDeleteOpen} sx={styles.menuItem}>
          <Delete sx={{ color: "error.dark" }} />
          <Typography>{translate("Delete category")}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
