import { useSelector } from "react-redux";

import { Box, Container, Typography } from "@mui/material";

import { selectUser, selectUserState } from "../../features/user/userSlice";

export default function HomePage() {
  const { user, isAuthenticated } = useSelector(selectUserState);
  const name = user?.name;
  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h2"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
      >
        Welcome {name ? `Back, ${name}` : "to Expense Manager"}!
      </Typography>
      {isAuthenticated ?
        <Box>
          Is Authenticated
        </Box>
        :
        <Box>
          Not Authenticated
        </Box>
      }
    </Container>
  );
}
