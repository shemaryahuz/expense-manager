import { Box, Button, TextField, Typography } from "@mui/material";

import { useTranslation } from "../../hooks/i18n";

import { profileSectionStyles as styles } from "./styles/ProfileSections.styles";

export default function ProfilePasswordSection({
  password,
  isLoading,
  onChange,
  onSubmit,
}) {
  const { translate } = useTranslation();

  return (
    <Box sx={styles.card}>
      <Typography variant="h6">{translate("Password")}</Typography>
      <Typography variant="body2" color="text.secondary">
        {translate("Set a new password for your account")}
      </Typography>
      <Box component="form" onSubmit={onSubmit} sx={styles.form}>
        <TextField
          type="password"
          label={translate("New Password")}
          name="password"
          value={password}
          required
          slotProps={{ htmlInput: { minLength: 4 } }}
          autoComplete="new-password"
          onChange={onChange}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading || !password}
          sx={styles.primaryButton}
        >
          {isLoading ? translate("Saving") : translate("Update")}
        </Button>
      </Box>
    </Box>
  );
}
