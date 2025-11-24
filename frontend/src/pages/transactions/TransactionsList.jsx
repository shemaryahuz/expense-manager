import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { transactionsListStyles as styles } from "./styles/TransactionsList.styles";

import TransactionRow from "./TransactionRow";

export default function TransactionsList({ transactions }) {
  return (
    <Table sx={styles.table}>
      <TableHead>
        <TableRow sx={styles.tableHead}>
          <TableCell>Date</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {transactions.map((transaction) => (
          <TransactionRow transaction={transaction} key={transaction.id} />
        ))}
      </TableBody>
    </Table>
  );
}
