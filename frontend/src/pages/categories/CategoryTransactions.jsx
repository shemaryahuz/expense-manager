import { Fragment } from "react";
import { useSelector } from "react-redux";

import { selectCurrency } from "../../features/settings/settingsSlice";

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import { useExchangeRate } from "../../hooks/useExchangeRate";

import { INCOME } from "../../constants/features/transactionsConstants";
import { CURRENCIES } from "../../constants/features/settingsConstants";

const { ILS } = CURRENCIES;

export default function CategoryTransactions({ transactions }) {
  const { currency, symbol } = useSelector(selectCurrency);
  const rate = useExchangeRate(ILS, currency);

  return (
    <List dense>
      {transactions.map(({ id, title, date, type, amount }, index) => (
        <Fragment key={id}>
          <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
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
                {currency === ILS
                  ? Number(amount).toFixed(2)
                  : (Number(amount) * rate).toFixed(2)}
              </Typography>
            </Box>
          </ListItem>
          {index !== transactions.length - 1 && <Divider />}
        </Fragment>
      ))}
    </List>
  );
}
