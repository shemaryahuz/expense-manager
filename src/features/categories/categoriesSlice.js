import { createSlice } from "@reduxjs/toolkit";


export const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
    },
    reducers: {
        addCategory: (state, action) => {
            state.categories.push(action.payload);
        },
    },
});

export const { addCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;