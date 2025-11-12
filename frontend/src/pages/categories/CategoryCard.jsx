import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import CategoryTransactions from "./CategoryTransactions";
import { INCOME_ID } from "../../features/categories/categoriesSlice";

export default function CategoryCard({ category }) {
  const { transactions } = useSelector((state) => state.transactions);

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.categoryId === category.id
  );

  const amount = filteredTransactions.reduce((accumulator, transaction) => 
    accumulator + transaction.amount, 0
  );

  return (
    <Accordion sx={{ width: "100%", maxWidth: "md" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", flexGrow: 1 }}>
            {category.name}
          </Typography>
          {amount > 0 && (
            <Typography
              variant="h6"
              sx={{ color: category.id === INCOME_ID ? "green" : "red" }}
            >
              {category.id === INCOME_ID ? "+ " : "- "} {amount}
            </Typography>
          )}
        </Box>
      </AccordionSummary>
      <Divider />
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
