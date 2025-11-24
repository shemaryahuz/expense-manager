import { useSelector } from "react-redux";

import { Grid } from "@mui/material";

import CategoriesGroup from "./CategoriesGroup";

import {
  selectCustomCategories,
  selectDefaultCategories,
  selectIncomeCategories,
} from "../../features/categories/categoriesSelectors";

export default function CategoriesContainer() {
  const income = useSelector(selectIncomeCategories);
  const defaults = useSelector(selectDefaultCategories);
  const userId = "u1"; // u1 = user id
  const custom = useSelector((state) => selectCustomCategories(state, userId));

  return (
    <Grid container direction="column" mb={4}>
      {income.length > 0 && (
        <CategoriesGroup name="Income" categories={income} />
      )}
      {defaults.length > 0 && (
        <CategoriesGroup name="Defaults" categories={defaults} />
      )}
      {custom.length > 0 && (
        <CategoriesGroup name="Custom" categories={custom} />
      )}
    </Grid>
  );
}
