import { useSelector } from "react-redux";

import { Grid, Typography } from "@mui/material";

import {
  selectIncomeTransactions,
  selectExpenseTransactions,
} from "../../features/transactions/transactionsSelectors";
import { getTotalAmount } from "../../utiles/transactionsUtils";

import { useTranslation } from "../../hooks/i18n";

import { monthlyBudgetStyles as styles } from "./styles/MonthlyBudget.styles";

export default function MonthlyBudget() {
  const { translate } = useTranslation();

  const incomeTransactions = useSelector(selectIncomeTransactions);
  const expenseTransactions = useSelector(selectExpenseTransactions);

  const totalIncome = getTotalAmount(incomeTransactions).toFixed(2);
  const totalExpenses = getTotalAmount(expenseTransactions).toFixed(2);
  const balance = (totalIncome - totalExpenses).toFixed(2);

  return (
    <Grid container spacing={2} sx={styles.container}>
      <Grid size="grow" sx={styles.gridItem}>
        <Typography variant="h6" sx={styles.title}>
          {translate("Total Income")}
        </Typography>
        <Typography variant="h4" sx={{ color: "green" }}>
          ${totalIncome}
        </Typography>
      </Grid>
      <Grid size={6} sx={styles.gridItem}>
        <Typography variant="h6" sx={styles.title}>
          {translate("Balance")}
        </Typography>
        <Typography variant="h4" sx={{ color: balance >= 0 ? "green" : "red" }}>
          ${balance}
        </Typography>
      </Grid>
      <Grid size="grow" sx={styles.gridItem}>
        <Typography variant="h6" sx={styles.title}>
          {translate("Total Expenses")}
        </Typography>
        <Typography variant="h4" sx={{ color: "red" }}>
          ${totalExpenses}
        </Typography>
      </Grid>
    </Grid>
  );
}
