import { createSelector } from "@reduxjs/toolkit";

import { INCOME_ID } from "../../constants/features/categoriesConstants";
import { selectUserId } from "../user/userSlice";

export const selectCategoriesState = (state) => state.categories;
export const selectCategories = (state) => selectCategoriesState(state).categories;

export const selectIncomeCategories = createSelector(
    [selectCategories],
    (categories) => categories.filter((category) =>
        category.id === INCOME_ID)
)

export const selectExpenseCategories = createSelector(
    [selectCategories],
    (categories) => categories.filter(({ id }) => id !== INCOME_ID)
)

export const selectDefaultCategories = createSelector(
    [selectCategories],
    (categories) => categories.filter(({ id, userId }) =>
        id !== INCOME_ID && userId === null)
)

export const selectCustomCategories = createSelector(
    [selectCategories, selectUserId],
    (categories, userId) => categories.filter((category) =>
        category.id !== INCOME_ID && category.userId === userId)
)