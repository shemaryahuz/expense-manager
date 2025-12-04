import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { transactionsListStyles as styles } from "./styles/TransactionsList.styles";

import TransactionRow from "./TransactionRow";

const headCells = ["Date", "Title", "Category", "Amount", "Actions"];

export default function TransactionsList({ transactions }) {
  return (
    <Table sx={styles.table}>
      <TableHead>
        <TableRow sx={styles.tableHead}>
          {headCells.map((headCell) => (
            <TableCell key={headCell}>{headCell}</TableCell>
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
