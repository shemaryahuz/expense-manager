import { createSelector } from "@reduxjs/toolkit";
import { EXPENSE, INCOME } from "../../constants/features/transactionsConstants";

export const selectTransactionsState = (state) => state.transactions;

export const selectTransactions = state => selectTransactionsState(state).transactions;

export const selectCategoriesTransactions = state => selectTransactionsState(state).categoriesTransactions;

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

export const selectTransactionsByCategoryId = createSelector(
    [selectCategoriesTransactions, (_, categoryId) => categoryId],
    (categoriesTransactions, categoryId) => categoriesTransactions.filter((transaction) => 
        transaction.categoryId === categoryId)
)