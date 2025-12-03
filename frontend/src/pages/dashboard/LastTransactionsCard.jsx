import { Fragment } from "react";

import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  Typography,
  List,
  ListItem,
  Box,
  Divider,
  ListItemText,
} from "@mui/material";

import { INCOME } from "../../constants/features/transactionsConstants";

import { ROUTE_PATHS } from "../../constants/app/routes";

import { dashboardStyles as styles } from "./styles/Dashboard.styles";

const { TRANSACTIONS } = ROUTE_PATHS;

export default function LastTransactionsCard({ transactions }) {
  const navigate = useNavigate();
  const lastTransactions = transactions.slice(0, 3);

  const handleNavigate = () => {
    navigate(TRANSACTIONS);
  };
  return (
    <Card sx={styles.card}>
      <Typography variant="h6" gutterBottom sx={styles.cardTitle}>
        Last Transactions
      </Typography>
      <List dense>
        {lastTransactions.length > 0 ? (
          lastTransactions.map((transaction, index) => (
            <Fragment key={transaction.id}>
              <ListItem sx={styles.transactionItem}>
                <ListItemText
                  primary={transaction.title}
                  secondary={transaction.date}
                />
                <Box
                  sx={{
                    color: transaction.type === INCOME ? "green" : "red",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1">
                    {transaction.type === INCOME ? "+ " : "- "}$
                    {transaction.amount}
                  </Typography>
                </Box>
              </ListItem>
              {index !== lastTransactions.length - 1 && <Divider />}
            </Fragment>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            No transactions found.
          </Typography>
        )}
      </List>
      <Button
        onClick={handleNavigate}
        fullWidth
        variant="contained"
        sx={styles.cardButton}
      >
        View All Transactions
      </Button>
    </Card>
  );
}
