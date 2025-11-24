import { createSlice } from "@reduxjs/toolkit";

import {
    addTransaction,
    deleteTransaction,
    editTransaction,
    fetchCategoriesTransactions,
    fetchTransactions,
    searchTransactions
} from "./transactionsThunks";

import { deleteCategory } from "../categories/categoriesThunks";

import { MISCELLANEOUS_ID } from "../categories/categoriesSlice";

export const INCOME = "income";
export const EXPENSE = "expense";

export const transactionsSlice = createSlice({
    name: "transactions",
    initialState: {
        transactions: [],
        categoriesTransactions: [], // for categories page
        searched: [],
        loading: false,
        error: "",
        actionLoading: false,
        actionError: "",
        success: "",
    },
    reducers: {
        clearSearched: (state) => {
            state.searched = [];
        },
        clearMessages: (state) => {
            state.error = "";
            state.success = "";
            state.actionError = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // fetch transactions thunk
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
                state.error = "";
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                console.log(action.error)
                state.error = action.payload || action.error.message;
            })

            // fetch transactions for categories page thunk
            .addCase(fetchCategoriesTransactions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategoriesTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.categoriesTransactions = action.payload;
            })
            .addCase(fetchCategoriesTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            // search transactions thunk
            .addCase(searchTransactions.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.searched = action.payload;
            })
            .addCase(searchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            // add transaction thunk
            .addCase(addTransaction.pending, (state) => {
                state.actionLoading = true;
                state.success = "";
                state.actionError = "";
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.loading = false;
                
                const { message, transaction: newTransaction } = action.payload;

                state.success = message;
                state.actionError = "";

                const date = new Date(newTransaction.date);
                newTransaction.date = date.toLocaleDateString();

                state.transactions.push(newTransaction);

                // sort transactions by date
                state.transactions.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB - dateA;
                });
            })
            .addCase(addTransaction.rejected, (state, action) => {
                state.actionLoading = false;
                state.actionError = action.payload || action.error.message;
                state.success = "";
            })

            // update transaction thunk
            .addCase(editTransaction.pending, (state) => {
                state.actionLoading = true;
                state.success = "";
                state.actionError = "";
            })
            .addCase(editTransaction.fulfilled, (state, action) => {
                state.loading = false;

                const { message, transaction: updatedTransaction } = action.payload;

                state.success = message;
                state.actionError = "";

                state.transactions = state.transactions.map((transaction) => {
                    if (transaction.id === updatedTransaction.id) {

                        const date = new Date(updatedTransaction.date);
                        updatedTransaction.date = date.toLocaleDateString();

                        return updatedTransaction;
                    }
                    return transaction;
                });
            })
            .addCase(editTransaction.rejected, (state, action) => {
                state.actionLoading = false;
                state.actionError = action.payload || action.error.message;
                state.success = "";
            })

            // delete transaction thunk
            .addCase(deleteTransaction.pending, (state) => {
                state.actionLoading = true;
                state.success = "";
                state.actionError = "";
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.actionLoading = false;

                const { message, id } = action.payload;

                state.success = message;
                state.actionError = "";
                
                state.transactions = state.transactions.filter((transaction) =>
                    transaction.id !== id);
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.actionLoading = false;
                state.actionError = action.payload || action.error.message;
                state.success = "";
            })

            // update transactions on category delete
            .addCase(deleteCategory.fulfilled, (state, action) => {

                const { id } = action.payload;
                // update transactions with MISCELLANEOUS_ID
                state.transactions.forEach((transaction) => {
                    if (transaction.categoryId === id) {
                        transaction.categoryId = MISCELLANEOUS_ID;
                    }
                });

                // update categoriesTransactions with MISCELLANEOUS_ID
                state.categoriesTransactions.forEach((transaction) => {
                    if (transaction.categoryId === id) {
                        transaction.categoryId = MISCELLANEOUS_ID;
                    }
                });
            })
    },
});

export default transactionsSlice.reducer;

export const { clearSearched, clearMessages } = transactionsSlice.actions;