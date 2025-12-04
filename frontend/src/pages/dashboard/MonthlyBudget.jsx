import { useSelector } from "react-redux";

import { Grid, Typography } from "@mui/material";

import {
  selectIncomeTransactions,
  selectExpenseTransactions,
} from "../../features/transactions/transactionsSelectors";
import { getTotalAmount } from "../../utiles/transactionsUtils";

import { monthlyBudgetStyles as styles } from "./styles/MonthlyBudget.styles";

export default function MonthlyBudget() {
  const incomeTransactions = useSelector(selectIncomeTransactions);
  const expenseTransactions = useSelector(selectExpenseTransactions);

  const totalIncome = getTotalAmount(incomeTransactions);
  const totalExpenses = getTotalAmount(expenseTransactions);
  const balance = totalIncome - totalExpenses;

  return (
    <Grid container spacing={2} sx={styles.container}>
      <Grid size="grow" sx={styles.gridItem}>
        <Typography variant="h6" sx={styles.title}>
          Total Income
        </Typography>
        <Typography variant="h4" sx={{ color: "green" }}>
          ${totalIncome}
        </Typography>
      </Grid>
      <Grid size={6} sx={styles.gridItem}>
        <Typography variant="h6" sx={styles.title}>
          Balance
        </Typography>
        <Typography variant="h4" sx={{ color: balance >= 0 ? "green" : "red" }}>
          ${balance}
        </Typography>
      </Grid>
      <Grid size="grow" sx={styles.gridItem}>
        <Typography variant="h6" sx={styles.title}>
          Total Expenses
        </Typography>
        <Typography variant="h4" sx={{ color: "red" }}>
          ${totalExpenses}
        </Typography>
      </Grid>
    </Grid>
  );
}
