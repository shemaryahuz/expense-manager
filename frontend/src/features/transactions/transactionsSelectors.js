import { createSelector } from "@reduxjs/toolkit";
import { EXPENSE, INCOME } from "../../constants/features/transactionsConstants";

export const selectTransactionsState = (state) => state.transactions;

export const selectTransactions = state => selectTransactionsState(state).transactions;

export const selectCategoriesTransactions = state => selectTransactionsState(state).categoriesTransactions;

export const selectIncomeTransactions = createSelector(
    [selectTransactions],
    (transactions) => transactions.filter(({ type }) => type === INCOME)
)

export const selectExpenseTransactions = createSelector(
    [selectTransactions],
    (transactions) => transactions.filter(({ type }) => type === EXPENSE)
)

export const selectTransactionsByCategoryId = (categoryId) => createSelector(
    [selectCategoriesTransactions, () => categoryId],
    (categoriesTransactions, categoryId) => categoriesTransactions.filter((transaction) =>
        transaction.categoryId === categoryId)
)