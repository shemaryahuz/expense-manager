import { INCOME_ID } from "./categoriesSlice";

export const selectCategoriesState = (state) => state.categories;

export const selectCategories = (state) => selectCategoriesState(state).categories;

export const selectIncomeCategories = (state) =>
    selectCategories(state).filter((category) =>
        category.id === INCOME_ID);

export const selectDefaultCategories = (state) =>
    selectCategories(state).filter((category) =>
        category.id !== INCOME_ID && category.userId === null);

export const selectCustomCategories = (state) =>
    selectCategories(state).filter((category) => category.userId === "u1"); // u1 = user id