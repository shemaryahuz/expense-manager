import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import CategoryTransactions from "./CategoryTransactions";

export default function CategoryCard({ category }) {
  const { transactions } = useSelector((state) => state.transactions);
  const filteredTransactions = transactions.filter(
    (transaction) => transaction.categoryId === category.id
  );
  return (
    <Accordion sx={{ width: "100%", maxWidth: "md" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {category.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ width: "100%", maxWidth: "md" }}>
        {filteredTransactions.length > 0 ? (
          <CategoryTransactions transactions={filteredTransactions} />
        ) : (
          <Typography>No transactions yet</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
