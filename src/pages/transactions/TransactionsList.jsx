import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import TransactionRow from "./TransactionRow";

export default function TransactionsList({ transactions }) {

  
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.map((transaction) => (
          <TransactionRow 
            transaction={transaction} 
            key={transaction.id} 
          />
        ))}
      </TableBody>
    </Table>
  );
}
