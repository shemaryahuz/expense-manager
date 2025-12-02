import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Container, Typography } from "@mui/material";

import { selectCategoriesState } from "../../features/categories/categoriesSelectors";
import { fetchCategories } from "../../features/categories/categoriesThunks";
import { clearMessages } from "../../features/categories/categoriesSlice";
import { fetchCategoriesTransactions } from "../../features/transactions/transactionsThunks";

import MonthHeader from "../../components/common/MonthHeader";
import Loader from "../../components/common/Loader";
import AlertMessage from "../../components/common/AlertMessage";
import Feedback from "../../components/common/Feedback";

import CategoriesContainer from "./CategoriesContainer";

export default function CategoriesPage() {
  const dispatch = useDispatch();

  const { loading, error, categories, actionError, success } = useSelector(
    selectCategoriesState
  );

  const [month, setMonth] = useState(new Date());

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCategoriesTransactions(month));
  }, [dispatch, month]);

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
  };

  const [showSuccess, setShowSuccess] = useState(false);
  const [showActionError, setShowActionError] = useState(false);

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
    }
  }, [success]);

  useEffect(() => {
    if (actionError) {
      setShowActionError(true);
    }
  }, [actionError]);

  const handleFeedbackClose = (event, reason) => {
    if (reason === "clickaway") return;
    setShowSuccess(false);
    setShowActionError(false);
    dispatch(clearMessages());
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h2"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
      >
        Categories
      </Typography>

      <MonthHeader
        month={month}
        hasNextMonth={true}
        hasPrevMonth={true}
        onMonthChange={handleMonthChange}
      />

      {loading && <Loader />}

      {!loading && error && <AlertMessage severity="error" message={error} />}

      {!loading && !error && categories.length > 0 && <CategoriesContainer />}

      {actionError && (
        <Feedback
          message={actionError}
          severity="error"
          open={showActionError}
          onClose={handleFeedbackClose}
        />
      )}
      {success && (
        <Feedback
          message={success}
          severity="success"
          open={showSuccess}
          onClose={handleFeedbackClose}
        />
      )}
    </Container>
  );
}
