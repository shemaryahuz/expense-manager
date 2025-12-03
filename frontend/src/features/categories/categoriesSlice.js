import { createSlice } from "@reduxjs/toolkit";
import { addCategory, deleteCategory, fetchCategories, updateCategory } from "./categoriesThunks";
import { STATUSES } from "../../constants/features/statusConstants";

const { IDLE, LOADING, SUCCEEDED, FAILED } = STATUSES;

const initialState = {
    categories: [],

    fetchStatus: IDLE,
    actionStatus: IDLE,

    fetchError: null,
    actionError: null,

    successMessage: null,
}

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        clearMessages: (state) => {
            state.fetchError = null;
            state.actionError = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.fetchStatus = LOADING;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.fetchStatus = SUCCEEDED;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.fetchStatus = FAILED;
                state.fetchError = action.payload || action.error.message;
            })

            // add category thunk
            .addCase(addCategory.pending, (state) => {
                state.actionStatus = LOADING;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                const { message, category: newCategory } = action.payload;

                state.actionStatus = SUCCEEDED;
                state.successMessage = message;
                state.categories.push(newCategory);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.actionStatus = FAILED;
                state.actionError = action.payload || action.error.message;
            })

            // update category thunk
            .addCase(updateCategory.pending, (state) => {
                state.actionStatus = LOADING;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const { message, category: updatedCategory } = action.payload;

                state.actionStatus = SUCCEEDED;
                state.successMessage = message;
                state.categories = state.categories.map((category) =>
                    category.id === updatedCategory.id ? updatedCategory : category
                );
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.actionStatus = FAILED;
                state.actionError = action.payload || action.error.message;
            })

            // delete category thunk
            .addCase(deleteCategory.pending, (state) => {
                state.actionStatus = LOADING;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                const { message, id } = action.payload;

                state.actionStatus = SUCCEEDED;
                state.successMessage = message;
                state.categories = state.categories.filter((category) => category.id !== id);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.actionStatus = FAILED;
                state.actionError = action.payload || action.error.message;
            });
    },
});

export const selectCategoriesState = (state) => state.categories;
export const { clearMessages } = categoriesSlice.actions;
export default categoriesSlice.reducer;