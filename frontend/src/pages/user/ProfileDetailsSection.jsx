import { Box, Button, TextField, Typography } from "@mui/material";

import { useTranslation } from "../../hooks/i18n";

import { profileSectionStyles as styles } from "./styles/ProfileSections.styles";

export default function ProfileDetailsSection({
  profile,
  isLoading,
  onChange,
  onSubmit,
}) {
  const { translate } = useTranslation();

  return (
    <Box sx={styles.card}>
      <Typography variant="h6">{translate("Profile Details")}</Typography>
      <Typography variant="body2" color="text.secondary">
        {translate("Update your name and email address")}
      </Typography>
      <Box component="form" onSubmit={onSubmit} sx={styles.form}>
        <TextField
          label={translate("Name")}
          name="name"
          value={profile.name}
          required
          onChange={onChange}
        />
        <TextField
          type="email"
          label={translate("Email")}
          name="email"
          value={profile.email}
          required
          onChange={onChange}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={styles.primaryButton}
        >
          {isLoading ? translate("Saving") : translate("Save")}
        </Button>
      </Box>
    </Box>
  );
}
