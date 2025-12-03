import { createSelector } from "@reduxjs/toolkit";
import { EXPENSE, INCOME } from "../../constants/features/transactionsConstants";

export const selectTransactionsState = (state) => state.transactions;

export const selectTransactions = createSelector(
    [selectTransactionsState],
    (transactionsState) => transactionsState.transactions
)

export const selectIncomeTransactions = createSelector(
    [selectTransactions],
    (transactions) => transactions.filter((transaction) => 
        transaction.type === INCOME)
)

export const selectExpenseTransactions = createSelector(
    [selectTransactions],
    (transactions) => transactions.filter((transaction) => 
        transaction.type === EXPENSE)
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