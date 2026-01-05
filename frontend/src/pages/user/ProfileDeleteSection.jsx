import { Box, Button, Divider, Typography } from "@mui/material";

import { profileSectionStyles as styles } from "./styles/ProfileSections.styles";

export default function ProfileDeleteSection({ isLoading, onOpenDialog }) {
  return (
    <Box sx={styles.narrowCard}>
      <Typography variant="h6" color="error.main">
        Delete account
      </Typography>
      <Typography variant="body2" color="text.secondary">
        This action is permanent and cannot be undone. All user data will be
        permanently deleted.
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Button
        variant="outlined"
        color="error"
        onClick={onOpenDialog}
        disabled={isLoading}
        sx={{ textTransform: "none", alignSelf: "flex-start" }}
      >
        Delete my account
      </Button>
    </Box>
  );
}
