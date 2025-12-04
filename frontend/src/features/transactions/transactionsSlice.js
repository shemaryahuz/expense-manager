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

import { updateTransaction, sortTransactionsByDate, updateTransactionsOnCategoryDelete } from "../../utiles/transactionsUtils";

import { MISCELLANEOUS_ID } from "../../constants/features/categoriesConstants";
import { STATUSES } from "../../constants/features/statusConstants";

const { IDLE, LOADING, SUCCEEDED, FAILED } = STATUSES;

const initialState = {
    transactions: [],
    categoriesTransactions: [], // for categories page
    searched: [],
    status: IDLE,
    message: null,
};

export const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        clearSearched: (state) => {
            state.searched = [];
        },
        clearMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetch transactions thunk
            .addCase(fetchTransactions.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.status = SUCCEEDED;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.status = FAILED;
                state.message = action.payload || action.error.message;
            })

            // fetch transactions for categories page thunk
            .addCase(fetchCategoriesTransactions.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(fetchCategoriesTransactions.fulfilled, (state, action) => {
                state.status = SUCCEEDED;
                state.categoriesTransactions = action.payload;
            })
            .addCase(fetchCategoriesTransactions.rejected, (state, action) => {
                state.status = FAILED;
                state.message = action.payload || action.error.message;
            })

            // search transactions thunk
            .addCase(searchTransactions.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(searchTransactions.fulfilled, (state, action) => {
                state.status = SUCCEEDED;
                state.searched = action.payload;
            })
            .addCase(searchTransactions.rejected, (state, action) => {
                state.status = FAILED;
                state.message = action.payload || action.error.message;
            })

            // add transaction thunk
            .addCase(addTransaction.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                const { message, transaction: newTransaction } = action.payload;

                const date = new Date(newTransaction.date);
                newTransaction.date = date.toLocaleDateString();

                state.status = SUCCEEDED;
                state.message = message;
                state.transactions.push(newTransaction);
                state.transactions = sortTransactionsByDate(state.transactions);
            })
            .addCase(addTransaction.rejected, (state, action) => {
                state.status = FAILED;
                state.message = action.payload || action.error.message;
            })

            // update transaction thunk
            .addCase(editTransaction.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(editTransaction.fulfilled, (state, action) => {
                const { message, transaction: updatedTransaction } = action.payload;

                state.status = SUCCEEDED;
                state.message = message;
                state.transactions = updateTransaction(state.transactions, updatedTransaction);
            })
            .addCase(editTransaction.rejected, (state, action) => {
                state.status = FAILED;
                state.message = action.payload || action.error.message;
            })

            // delete transaction thunk
            .addCase(deleteTransaction.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                const { message, id } = action.payload;

                state.status = SUCCEEDED;
                state.message = message;
                state.transactions = state.transactions.filter((transaction) =>
                    transaction.id !== id);
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.status = FAILED;
                state.message = action.payload || action.error.message;
            })

            // update transactions on category delete
            .addCase(deleteCategory.fulfilled, (state, action) => {
                const { id } = action.payload;

                state.status = SUCCEEDED;
                state.transactions = updateTransactionsOnCategoryDelete(state.transactions, id);
                state.categoriesTransactions = updateTransactionsOnCategoryDelete(state.categoriesTransactions, id);
            })
    },
});

export default transactionsSlice.reducer;

export const { clearSearched, clearMessage } = transactionsSlice.actions;