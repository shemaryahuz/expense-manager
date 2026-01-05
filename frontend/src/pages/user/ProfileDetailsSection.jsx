import { Box, Button, TextField, Typography } from "@mui/material";

import { profileSectionStyles as styles } from "./styles/ProfileSections.styles";

export default function ProfileDetailsSection({
  profile,
  isLoading,
  onChange,
  onSubmit,
}) {
  return (
    <Box sx={styles.card}>
      <Typography variant="h6">Profile details</Typography>
      <Typography variant="body2" color="text.secondary">
        Update your name and email address.
      </Typography>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={styles.form}
      >
        <TextField
          label="Name"
          name="name"
          value={profile.name}
          required
          onChange={onChange}
        />
        <TextField
          type="email"
          label="Email"
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
          {isLoading ? "Saving..." : "Save changes"}
        </Button>
      </Box>
    </Box>
  );
}


