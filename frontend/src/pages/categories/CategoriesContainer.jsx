import { useSelector } from "react-redux";
import { Grid } from "@mui/material";

import { selectUserId } from "../../features/user/userSlice";
import {
  selectDefaultCategories,
  selectIncomeCategories,
  selectCustomCategories,
} from "../../features/categories/categoriesSelectors";

import { GROUP_NAMES } from "../../constants/features/categoriesConstants";

import CategoriesGroup from "./CategoriesGroup";

const { INCOME, DEFAULTS, CUSTOM } = GROUP_NAMES;

export default function CategoriesContainer() {
  const userId = useSelector(selectUserId);

  const incomeCategories = useSelector(selectIncomeCategories);
  const defaultCategories = useSelector(selectDefaultCategories);
  const customCategories = useSelector(selectCustomCategories(userId));

  return (
    <Grid container direction="column" mb={4}>
      {incomeCategories && (
        <CategoriesGroup name={INCOME} categories={incomeCategories} />
      )}
      {defaultCategories && (
        <CategoriesGroup name={DEFAULTS} categories={defaultCategories} />
      )}
      {customCategories && (
        <CategoriesGroup name={CUSTOM} categories={customCategories} />
      )}
    </Grid>
  );
}
