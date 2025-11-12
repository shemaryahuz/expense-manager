import { createSlice } from "@reduxjs/toolkit";
import { addTransaction, deleteTransaction, fetchTransactions, searchTransactions } from "./transactionsThunks";


export const transactionsSlice = createSlice({
    name: "transactions",
    initialState: {
        transactions: [],
        searched: [],
        loading: false,
        error: "",
    },
    reducers: {
        clearSearched: (state) => {
            state.searched = [];
        }
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
                state.error = action.error.message;
            })

            // search transactions thunk
            .addCase(searchTransactions.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchTransactions.fulfilled, (state, action) => {
                console.log(action.payload);
                
                state.loading = false;
                state.searched = action.payload;
                state.error = "";
            })
            .addCase(searchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // add transaction thunk
            .addCase(addTransaction.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.loading = false;
                action.payload.date = new Date(action.payload.date).toLocaleDateString();
                state.transactions.unshift(action.payload);
                state.error = "";
            })
            .addCase(addTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // delete transaction thunk
            .addCase(deleteTransaction.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = state.transactions.filter((transaction) => transaction.id !== action.payload.id);
                state.error = "";
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default transactionsSlice.reducer;

export const { clearSearched } = transactionsSlice.actions;