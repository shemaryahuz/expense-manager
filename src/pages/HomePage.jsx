import { Box, Button, ButtonGroup, Container, Grid } from "@mui/material";

export default function HomePage() {
  return (
    <>
      <Container>
        <h1>Welcome to Expense Manager!</h1>
        <p>Manage your expenses and income easily.</p>
      </Container>
      <Grid container spacing={2} padding={2}>
        <Box>
          <h2>Last Expenses:</h2>
          <ul>
            <li>Groceries - $50</li>
            <li>Transport - $20</li>
            <li>Utilities - $100</li>
          </ul>
        </Box>
        <Box>
          <h2>Current Budget:</h2>
          <p>Expenses: $500</p>
          <p>Income: $2000</p>
          <p>Remaining: $1500</p>
        </Box>
      </Grid>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button variant="contained" color="primary" href="/dashboard">
          Go to Dashboard
        </Button>
        <Button variant="contained" color="primary" href="/budgets">
          Go to Budgets
        </Button>
      </ButtonGroup>
    </>
  );
}
