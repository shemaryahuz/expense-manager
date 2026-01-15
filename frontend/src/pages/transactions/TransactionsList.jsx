import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { useTranslation } from "../../hooks/i18n";

import { transactionsListStyles as styles } from "./styles/TransactionsList.styles";

import TransactionRow from "./TransactionRow";

const columnNames = ["Date", "Title", "Category", "Amount", "Actions"];

export default function TransactionsList({ transactions }) {
  const { translate } = useTranslation();

  return (
    <Table sx={styles.table}>
      <TableHead>
        <TableRow sx={styles.tableHead}>
          {columnNames.map((columnName) => (
            <TableCell key={columnName}>{translate(columnName)}</TableCell>
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
