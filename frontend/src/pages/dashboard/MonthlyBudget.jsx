import { useSelector } from "react-redux";

import { Grid, Typography } from "@mui/material";

import {
  selectIncomeTransactions,
  selectExpenseTransactions,
} from "../../features/transactions/transactionsSelectors";
import { selectCurrency } from "../../features/settings/settingsSlice";

import { getTotalAmount } from "../../utiles/transactionsUtils";
import { useTranslation } from "../../hooks/i18n";
import { useExchangeRate } from "../../hooks/useExchangeRate";

import { CURRENCIES } from "../../constants/features/settingsConstants";

import { monthlyBudgetStyles as styles } from "./styles/MonthlyBudget.styles";

const { ILS } = CURRENCIES;

export default function MonthlyBudget() {
  const { translate } = useTranslation();

  const incomeTransactions = useSelector(selectIncomeTransactions);
  const expenseTransactions = useSelector(selectExpenseTransactions);

  const { currency, symbol } = useSelector(selectCurrency);

  const baseTotalIncome = getTotalAmount(incomeTransactions);
  const baseTotalExpenses = getTotalAmount(expenseTransactions);

  const rate = useExchangeRate(ILS, currency);

  const totalIncome = (baseTotalIncome * rate).toFixed(2);
  const totalExpenses = (baseTotalExpenses * rate).toFixed(2);
  const balance = ((baseTotalIncome - baseTotalExpenses) * rate).toFixed(2);

  return (
    <Grid container spacing={2} sx={styles.container}>
      <Grid size={{ xs: 12, md: "grow" }} sx={styles.gridItem}>
        <Typography variant="h6" sx={styles.title}>
          {translate("Total Income")}
        </Typography>
        <Typography variant="h4" sx={{ color: "green" }}>
          {symbol}
          {totalIncome}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }} sx={styles.gridItem}>
        <Typography variant="h6" sx={styles.title}>
          {translate("Balance")}
        </Typography>
        <Typography variant="h4" sx={{ color: balance >= 0 ? "green" : "red" }}>
          {symbol}
          {balance}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: "grow" }} sx={styles.gridItem}>
        <Typography variant="h6" sx={styles.title}>
          {translate("Total Expenses")}
        </Typography>
        <Typography variant="h4" sx={{ color: "red" }}>
          {symbol}
          {totalExpenses}
        </Typography>
      </Grid>
    </Grid>
  );
}
