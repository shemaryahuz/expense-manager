import { Grid } from "@mui/material";
import { INCOME_ID } from "../../features/categories/categoriesSlice";
import CategoriesGroup from "./CategoriesGroup";

export default function CategoriesContainer({ categories }) {
  const income = categories.filter((category) => category.id === INCOME_ID);
  const defaults = categories.filter(
    (category) => category.id !== INCOME_ID && category.userId === null
  );
  const custom = categories.filter((category) => category.userId === "u1"); // u1 = user id

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
