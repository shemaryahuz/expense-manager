import { useSelector } from "react-redux";
import { Grid } from "@mui/material";

import { selectUser } from "../../features/user/userSlice";
import {
  selectDefaultCategories,
  selectIncomeCategories,
  selectCustomCategories,
} from "../../features/categories/categoriesSelectors";

import { GROUP_NAMES } from "../../constants/features/categoriesConstants";

import CategoriesGroup from "./CategoriesGroup";

const { INCOME, DEFAULTS, CUSTOM } = GROUP_NAMES;

export default function CategoriesContainer({ categories }) {
  const userId = useSelector(selectUser)?.id;

  const incomeCategories = useSelector(selectIncomeCategories);
  const defaultCategories = useSelector(selectDefaultCategories);
  const customCategories = useSelector(selectCustomCategories(userId));

  return (
    <Grid container direction="column" mb={4}>
      {incomeCategories.length > 0 && (
        <CategoriesGroup name={INCOME} categories={incomeCategories} />
      )}
      {defaultCategories.length > 0 && (
        <CategoriesGroup name={DEFAULTS} categories={defaultCategories} />
      )}
      {customCategories.length > 0 && (
        <CategoriesGroup name={CUSTOM} categories={customCategories} />
      )}
    </Grid>
  );
}
