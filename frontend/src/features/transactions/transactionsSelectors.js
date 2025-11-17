import { createSelector } from "@reduxjs/toolkit";

export const selectTransactionsState = (state) => state.transactions;

export const selectTransactions = createSelector(
    [selectTransactionsState],
    (transactionsState) => transactionsState.transactions
)

export const selectCategoriesTransactions = createSelector(
    [selectTransactionsState],
    (transactionsState) => transactionsState.categoriesTransactions
)

export const selectTransactionsByCategoryId = createSelector(
    [selectCategoriesTransactions, (_, categoryId) => categoryId],
    (categoriesTransactions, categoryId) => categoriesTransactions.filter((transaction) => 
        transaction.categoryId === categoryId)
)