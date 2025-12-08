import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Typography } from "@mui/material";

import { fetchCategories } from "../../features/categories/categoriesThunks";
import { clearMessage } from "../../features/categories/categoriesSlice";
import { selectCategoriesState } from "../../features/categories/categoriesSelectors";
import { fetchCategoriesTransactions } from "../../features/transactions/transactionsThunks";

import { STATUSES } from "../../constants/features/statusConstants";
import { getCurrentMonth, dayjsToDate } from "../../utiles/monthUtils";

import MonthHeader from "../../components/common/MonthHeader";
import Loader from "../../components/common/Loader";
import Feedback from "../../components/common/Feedback";

import CategoriesContainer from "./CategoriesContainer";

const { IDLE, LOADING, FAILED, SUCCEEDED } = STATUSES;

export default function CategoriesPage() {
  const dispatch = useDispatch();

  const [month, setMonth] = useState(getCurrentMonth);
  const [showMessage, setShowMessage] = useState(false);

  const { status, message, categories } = useSelector(selectCategoriesState);

  useEffect(() => {
    if (status === IDLE) {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(fetchCategoriesTransactions(dayjsToDate(month)));
  }, [dispatch, month]);

  useEffect(() => {
    if ((status === SUCCEEDED || status === FAILED) && message) {
      setShowMessage(true);
    }
  }, [status, message]);

  const handleMonthChange = (dayjsMonth) => setMonth(dayjsMonth);

  const handleFeedbackClose = (_, reason) => {
    if (reason !== "clickaway") {
      setShowMessage(false);
      dispatch(clearMessage());
    }
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

      {status === LOADING && <Loader />}

      {categories.length > 0 ? (
        <CategoriesContainer />
      ) : (
        <Typography variant="h6">No categories found</Typography>
      )}

      {(status === FAILED || status === SUCCEEDED) && message && (
        <Feedback
          message={message}
          severity={status === FAILED ? "error" : "success"}
          open={showMessage}
          onClose={handleFeedbackClose}
        />
      )}
    </Container>
  );
}
