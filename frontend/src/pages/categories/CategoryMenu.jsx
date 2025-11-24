import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Delete, Edit, MoreVert } from "@mui/icons-material";

import { CategoryCardStyles as styles } from "./styles/CategoryCard.styles";

export default function CategoryMenu({
  userId,
  isEditing,
  anchorEl,
  menuOpen,
  onMenuClick,
  onMenuClose,
  onEdit,
  onDeleteOpen,
}) {
  if (!userId || isEditing) return null;

  return (
    <Box sx={styles.categoryMenu}>
      <IconButton onClick={onMenuClick}>
        <MoreVert />
      </IconButton>

      <Menu anchorEl={anchorEl} open={menuOpen} onClose={onMenuClose}>
        <MenuItem onClick={onEdit} sx={styles.menuItem}>
          <Edit />
          <Typography>Rename category</Typography>
        </MenuItem>

        <MenuItem onClick={onDeleteOpen} sx={styles.menuItem}>
          <Delete sx={{ color: "error.dark" }} />
          <Typography>Delete category</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
