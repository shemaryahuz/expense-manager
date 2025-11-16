import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Container, Typography } from "@mui/material";


import { fetchCategories } from "../../features/categories/categoriesThunks";
import { fetchCategoriesTransactions } from "../../features/transactions/transactionsThunks";

import MonthHeader from "../../components/common/MonthHeader";
import Loader from "../../components/common/Loader";
import Error from "../../components/common/Error";

import CategoriesContainer from "./CategoriesContainer";

export default function CategoriesPage() {

  const dispatch = useDispatch();

  const { loading, error, categories } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCategoriesTransactions())
  }, [dispatch]);

  const [ month, setMonth ] = useState(new Date());

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
    dispatch(fetchCategoriesTransactions(newMonth));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
        Categories
      </Typography>

      <MonthHeader month={month} hasNextMonth={true} hasPrevMonth={true} onMonthChange={handleMonthChange}/>

      {loading && <Loader />}

      {!loading && error && <Error error={error} />}

      {!loading && !error && categories.length > 0 && (
        <CategoriesContainer />
      )}
    </Container>
  );
}
