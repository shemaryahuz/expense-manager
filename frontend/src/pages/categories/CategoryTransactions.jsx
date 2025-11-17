import { Fragment } from "react";

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import { AttachMoney } from "@mui/icons-material";

export default function CategoryTransactions({ transactions }) {
  return (
    <List dense>
      {transactions.map((transaction, index) => (
        <Fragment key={transaction.id}>
          <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
            <ListItemText
              primary={transaction.title}
              secondary={transaction.date}
            />
            <Box
              sx={{
                color: transaction.type === "income" ? "green" : "red",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">
                {transaction.type === "income" ? "+ " : "- "}
                {transaction.amount}
              </Typography>
              <AttachMoney fontSize="inherit" />
            </Box>
          </ListItem>
          {index !== transactions.length - 1 && <Divider />}
        </Fragment>
      ))}
    </List>
  );
}
