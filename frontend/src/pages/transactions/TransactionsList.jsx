import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { transactionsListStyles as styles } from "./styles/TransactionsList.styles";

import TransactionRow from "./TransactionRow";

const columnNames = ["Date", "Title", "Category", "Amount", "Actions"];

export default function TransactionsList({ transactions }) {
  return (
    <Table sx={styles.table}>
      <TableHead>
        <TableRow sx={styles.tableHead}>
          {columnNames.map((columnName) => (
            <TableCell key={columnName}>{columnName}</TableCell>
          ))}
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
