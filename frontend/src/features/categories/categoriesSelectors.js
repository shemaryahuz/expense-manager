import { createSelector } from "@reduxjs/toolkit";
import { INCOME_ID } from "../../constants/features/categoriesConstants";

export const selectCategoriesState = (state) => state.categories;

export const selectCategories = createSelector(
    [selectCategoriesState],
    (categoriesState) => categoriesState.categories
)

export const selectIncomeCategories = createSelector(
    [selectCategories],
    (categories) => categories.filter((category) => 
        category.id === INCOME_ID)
)

export const selectExpenseCategories = createSelector(
    [selectCategories],
    (categories) => categories.filter((category) => 
        category.id !== INCOME_ID)
)

export const selectDefaultCategories = createSelector(
    [selectCategories],
    (categories) => categories.filter((category) => 
        category.id !== INCOME_ID && category.userId === null)
)

export const selectCustomCategories = createSelector(
    [selectCategories, (_, userId) => userId],
    (categories, userId) => categories.filter((category) => 
        category.id !== INCOME_ID && category.userId === userId)
)