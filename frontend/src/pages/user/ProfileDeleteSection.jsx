import { Box, Button, Divider, Typography } from "@mui/material";

import { profileSectionStyles as styles } from "./styles/ProfileSections.styles";

import { useTranslation } from "../../hooks/i18n";

export default function ProfileDeleteSection({ isLoading, onOpenDialog }) {
  const { translate } = useTranslation();

  return (
    <Box sx={styles.narrowCard}>
      <Typography variant="h6" color="error.main">
        {translate("Delete Account")}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {translate(
          "This action is permanent and cannot be undone. All user data will be permanently deleted"
        )}
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Button
        variant="outlined"
        color="error"
        onClick={onOpenDialog}
        disabled={isLoading}
        sx={{ textTransform: "none" }}
      >
        {translate("Delete Account")}
      </Button>
    </Box>
  );
}
