import { Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import { Fragment } from "react";

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
              sx={{ color: transaction.type === "income" ? "green" : "red" }}
            >
              {transaction.type === "income" ? "+ " : "- "}
              {transaction.amount}
            </Box>
          </ListItem>
          {index !== transactions.length - 1 && <Divider />}
        </Fragment>
      ))}
    </List>
  );
}
