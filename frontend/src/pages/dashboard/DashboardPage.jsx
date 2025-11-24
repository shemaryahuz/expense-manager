import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Box, Container, Typography } from "@mui/material";

import { selectTransactionsState } from "../../features/transactions/transactionsSelectors";
import {
  fetchCategoriesTransactions,
  fetchTransactions,
} from "../../features/transactions/transactionsThunks";
import { fetchCategories } from "../../features/categories/categoriesThunks";
import {
  selectCategoriesState,
  selectExpenseCategories,
} from "../../features/categories/categoriesSelectors";

import MonthHeader from "../../components/common/MonthHeader";
import Loader from "../../components/common/Loader";
import Error from "../../components/common/Error";

import LastTransactionsCard from "./LastTransactionsCard";
import TopCategoriesCard from "./TopCategoriescard";

import { dashboardStyles as styles } from "./styles/Dashboard.styles";
import MonthlyBudget from "./MonthlyBudget";

export default function DashboardPage() {
  const dispatch = useDispatch();

  const {
    loading: transactionsLoading,
    error: transactionsError,
    transactions,
    categoriesTransactions,
  } = useSelector(selectTransactionsState);
  const { loading: categoriesLoading, error: categoriesError } = useSelector(
    selectCategoriesState
  );
  const categories = useSelector(selectExpenseCategories);

  const [month, setMonth] = useState(new Date());

  useEffect(() => {
    dispatch(fetchTransactions(month));
    dispatch(fetchCategoriesTransactions(month));
    dispatch(fetchCategories());
  }, [dispatch, month]);

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
  };

  return (
    <Container sx={styles.container}>
      <Typography variant="h2" gutterBottom sx={styles.heading}>
        Dashboard
      </Typography>

      <MonthHeader month={month} onMonthChange={handleMonthChange} />

      {(transactionsLoading || categoriesLoading) && <Loader />}
      {(transactionsError || categoriesError) && (
        <Error error={transactionsError || categoriesError} />
      )}

      {!transactionsLoading &&
        !categoriesLoading &&
        !transactionsError &&
        !categoriesError && (
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
