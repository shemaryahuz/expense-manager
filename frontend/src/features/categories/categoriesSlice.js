import { createSlice } from "@reduxjs/toolkit";
import { addCategory, deleteCategory, fetchCategories, updateCategory } from "./categoriesThunks";
import { STATUSES } from "../../constants/features/statusConstants";

const { IDLE, LOADING, SUCCEEDED, FAILED } = STATUSES;

const initialState = {
    categories: [],
    status: IDLE,
    message: null,
}

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = SUCCEEDED;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = FAILED;
                state.message = action.payload || action.error.message;
            })

            // add category thunk
            .addCase(addCategory.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                const { message, category: newCategory } = action.payload;

                state.status = SUCCEEDED;
                state.message = message;
                state.categories.push(newCategory);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.status = FAILED;
                state.message = action.payload || action.error.message;
            })

            // update category thunk
            .addCase(updateCategory.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const { message, category: updatedCategory } = action.payload;

                state.status = SUCCEEDED;
                state.message = message;
                state.categories = state.categories.map((category) =>
                    category.id === updatedCategory.id ? updatedCategory : category
                );
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.status = FAILED;
                state.message = action.payload || action.error.message;
            })

            // delete category thunk
            .addCase(deleteCategory.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                const { message, id } = action.payload;

                state.status = SUCCEEDED;
                state.message = message;
                state.categories = state.categories.filter((category) => category.id !== id);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.status = FAILED;
                state.message = action.payload || action.error.message;
            });
    },
});

export const { clearMessage } = categoriesSlice.actions;
export default categoriesSlice.reducer;