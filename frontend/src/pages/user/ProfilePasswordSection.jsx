import { Box, Button, TextField, Typography } from "@mui/material";

import { profileSectionStyles as styles } from "./styles/ProfileSections.styles";

export default function ProfilePasswordSection({
  password,
  isLoading,
  onChange,
  onSubmit,
}) {
  return (
    <Box sx={styles.card}>
      <Typography variant="h6">Password</Typography>
      <Typography variant="body2" color="text.secondary">
        Set a new password for your account.
      </Typography>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={styles.form}
      >
        <TextField
          type="password"
          label="New password"
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
          {isLoading ? "Saving..." : "Update password"}
        </Button>
      </Box>
    </Box>
  );
}


