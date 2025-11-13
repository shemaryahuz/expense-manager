import { createSlice } from "@reduxjs/toolkit";
import { addCategory, deleteCategory, fetchCategories } from "./categoriesThunks";
import { fetchTransactions } from "../transactions/transactionsThunks";

export const INCOME_ID = "c0";
export const MISCELLANEOUS_ID = "c1";

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        loading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // add category thunk
            .addCase(addCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // delete category thunk
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter((category) => category.id !== action.payload.id);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default categoriesSlice.reducer;