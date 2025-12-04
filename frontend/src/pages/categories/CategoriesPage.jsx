import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Typography } from "@mui/material";

import { fetchCategories } from "../../features/categories/categoriesThunks";
import {
  selectCategoriesState,
  clearMessages,
} from "../../features/categories/categoriesSlice";
import { fetchCategoriesTransactions } from "../../features/transactions/transactionsThunks";

import { STATUSES } from "../../constants/features/statusConstants";

import MonthHeader from "../../components/common/MonthHeader";
import Loader from "../../components/common/Loader";
import AlertMessage from "../../components/common/AlertMessage";
import Feedback from "../../components/common/Feedback";

import CategoriesContainer from "./CategoriesContainer";

const { IDLE, LOADING, FAILED, SUCCEEDED } = STATUSES;

export default function CategoriesPage() {
  const dispatch = useDispatch();

  const [month, setMonth] = useState(new Date());
  const [showSuccess, setShowSuccess] = useState(false);
  const [showActionError, setShowActionError] = useState(false);

  const {
    fetchStatus: fetchCategoriesStatus,
    fetchError: fetchCategoriesError,
    actionStatus,
    actionError,
    successMessage,
    categories,
  } = useSelector(selectCategoriesState);

  useEffect(() => {
    if (fetchCategoriesStatus === IDLE) {
      dispatch(fetchCategories());
    }
  }, [dispatch, fetchCategoriesStatus]);

  useEffect(() => {
    dispatch(fetchCategoriesTransactions(month));
  }, [dispatch, month]);

  useEffect(() => {
    if (actionStatus === FAILED && actionError) {
      setShowActionError(true);
    } else if (actionStatus === SUCCEEDED && successMessage) {
      setShowSuccess(true);
    }
  }, [actionStatus, actionError, successMessage]);

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
  };

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

      <MonthHeader month={month} onMonthChange={handleMonthChange} />

      {fetchCategoriesStatus === LOADING && <Loader />}

      {fetchCategoriesError && (
        <AlertMessage severity="error" message={fetchCategoriesError} />
      )}

      {!fetchCategoriesError && categories.length > 0 && (
        <CategoriesContainer categories={categories} />
      )}

      {actionError && (
        <Feedback
          message={actionError}
          severity="error"
          open={showActionError}
          onClose={handleFeedbackClose}
        />
      )}
      {successMessage && (
        <Feedback
          message={successMessage}
          severity="success"
          open={showSuccess}
          onClose={handleFeedbackClose}
        />
      )}
    </Container>
  );
}
