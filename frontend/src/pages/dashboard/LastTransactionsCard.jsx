import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useTranslation } from "../../hooks/i18n";

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

import { selectCurrency } from "../../features/settings/settingsSlice";

import { INCOME } from "../../constants/features/transactionsConstants";
import { ROUTE_PATHS } from "../../constants/app/routes";
import { LAST_TRANSACTIONS_LIMIT } from "../../constants/ui/dashboardConstants";

import { dashboardStyles as styles } from "./styles/Dashboard.styles";

const { TRANSACTIONS } = ROUTE_PATHS;

export default function LastTransactionsCard({ transactions }) {
  const navigate = useNavigate();

  const { translate } = useTranslation();

  const { symbol } = useSelector(selectCurrency);

  const lastTransactions = transactions.slice(0, LAST_TRANSACTIONS_LIMIT);

  const handleNavigate = () => navigate(TRANSACTIONS);

  return (
    <Card sx={styles.card}>
      <Typography variant="h6" gutterBottom sx={styles.cardTitle}>
        {translate("Last Transactions")}
      </Typography>
      <List dense>
        {lastTransactions.length > 0 ? (
          lastTransactions.map(({ id, title, date, type, amount }, index) => (
            <Fragment key={id}>
              <ListItem sx={styles.transactionItem}>
                <ListItemText primary={title} secondary={date} />
                <Box
                  sx={{
                    color: type === INCOME ? "green" : "red",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1">
                    {type === INCOME ? "+ " : "- "}
                    {symbol}
                    {amount}
                  </Typography>
                </Box>
              </ListItem>
              {index !== lastTransactions.length - 1 && <Divider />}
            </Fragment>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {translate("No transactions found")}
          </Typography>
        )}
      </List>
      <Button
        onClick={handleNavigate}
        fullWidth
        variant="contained"
        sx={styles.cardButton}
      >
        {translate("See all transactions")}
      </Button>
    </Card>
  );
}
