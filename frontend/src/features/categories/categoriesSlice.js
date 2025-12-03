import { createSlice } from "@reduxjs/toolkit";
import { addCategory, deleteCategory, fetchCategories, updateCategory } from "./categoriesThunks";

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        loading: false,
        error: "",
        actionLoading: false,
        actionError: "",
        success: "",

    },
    reducers: {
        clearMessages: (state) => {
            state.error = "";
            state.success = "";
            state.actionError = "";
        },
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
                state.error = action.payload || action.error.message;
            })

            // add category thunk
            .addCase(addCategory.pending, (state) => {
                state.actionLoading = true;
                state.actionError = "";
                state.success = "";
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.actionLoading = false;
                const { message, category: newCategory } = action.payload;
                state.success = message;
                state.actionError = "";
                state.categories.push(newCategory);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.actionLoading = false;
                state.actionError = action.payload || action.error.message;
            })

            // update category thunk
            .addCase(updateCategory.pending, (state) => {
                state.actionLoading = true;
                state.actionError = "";
                state.success = "";
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.actionLoading = false;
                const { message, category: updatedCategory } = action.payload;
                state.success = message;
                state.actionError = "";
                state.categories = state.categories.map((category) => {
                    if (category.id === updatedCategory.id) {
                        return updatedCategory;
                    }
                    return category;
                });
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.actionLoading = false;
                state.actionError = action.payload || action.error.message;
            })

            // delete category thunk
            .addCase(deleteCategory.pending, (state) => {
                state.actionLoading = true;
                state.actionError = "";
                state.success = "";
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.actionLoading = false;
                const { message, id } = action.payload;
                state.success = message;
                state.actionError = "";
                state.categories = state.categories.filter((category) => category.id !== id);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.actionLoading = false;
                state.actionError = action.payload || action.error.message;
            });
    },
});


export const { clearMessages } = categoriesSlice.actions;
export default categoriesSlice.reducer;