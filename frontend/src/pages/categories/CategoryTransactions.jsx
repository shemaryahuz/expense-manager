import { Fragment } from "react";

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import { INCOME } from "../../constants/features/transactionsConstants";

export default function CategoryTransactions({ transactions }) {
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
                {type === INCOME ? "+ " : "- "}${amount}
              </Typography>
            </Box>
          </ListItem>
          {index !== transactions.length - 1 && <Divider />}
        </Fragment>
      ))}
    </List>
  );
}
