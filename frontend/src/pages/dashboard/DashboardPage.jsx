import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Container, Typography } from "@mui/material";

import { selectTransactionsState } from "../../features/transactions/transactionsSelectors";
import {
  fetchCategoriesTransactions,
  fetchTransactions,
} from "../../features/transactions/transactionsThunks";
import { fetchCategories } from "../../features/categories/categoriesThunks";
import { selectCategoriesState } from "../../features/categories/categoriesSlice";
import { getExpenseCategories } from "../../utiles/categoriesUtils";

import MonthHeader from "../../components/common/MonthHeader";
import Loader from "../../components/common/Loader";
import AlertMessage from "../../components/common/AlertMessage";

import MonthlyBudget from "./MonthlyBudget";
import LastTransactionsCard from "./LastTransactionsCard";
import TopCategoriesCard from "./TopCategoriesCard";

import { STATUSES } from "../../constants/features/statusConstants";

import { dashboardStyles as styles } from "./styles/Dashboard.styles";

const { IDLE, LOADING, FAILED, SUCCEEDED } = STATUSES;

export default function DashboardPage() {
  const dispatch = useDispatch();

  const {
    status: transactionsStatus,
    message: transactionMessage,
    transactions,
    categoriesTransactions,
  } = useSelector(selectTransactionsState);
  const {
    status: categoriesStatus,
    message: categoriesMessage,
    categories: allCategories,
  } = useSelector(selectCategoriesState);
  const categories = getExpenseCategories(allCategories);

  const [month, setMonth] = useState(new Date());

  const loading =
    transactionsStatus === LOADING || categoriesStatus === LOADING;
  const failed = transactionsStatus === FAILED || categoriesStatus === FAILED;
  const succeeded =
    transactionsStatus === SUCCEEDED && categoriesStatus === SUCCEEDED;
  const message = transactionMessage || categoriesMessage;

  useEffect(() => {
    if (categoriesStatus === IDLE) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoriesStatus]);

  useEffect(() => {
    dispatch(fetchTransactions(month));
    dispatch(fetchCategoriesTransactions(month));
  }, [dispatch, month]);

  const handleMonthChange = (newMonth) => setMonth(newMonth);

  return (
    <Container sx={styles.container}>
      <Typography variant="h2" gutterBottom sx={styles.heading}>
        Dashboard
      </Typography>

      <MonthHeader month={month} onMonthChange={handleMonthChange} />

      {loading && <Loader />}

      {failed && message && <AlertMessage severity="error" message={message} />}

      {succeeded && (
        <Box>
          <MonthlyBudget />

          <Box sx={styles.cardsBox}>
            <LastTransactionsCard transactions={transactions} />
            <TopCategoriesCard
              transactions={categoriesTransactions}
              categories={categories}
            />
          </Box>
        </Box>
      )}
    </Container>
  );
}
