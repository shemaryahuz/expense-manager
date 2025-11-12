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
          <TableCell sx={{fontWeight: "bold"}}>Date</TableCell>
          <TableCell sx={{fontWeight: "bold"}}>Title</TableCell>
          <TableCell sx={{fontWeight: "bold"}}>Category</TableCell>
          <TableCell sx={{fontWeight: "bold"}}>Amount</TableCell>
          <TableCell sx={{fontWeight: "bold"}}>Actions</TableCell>
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
