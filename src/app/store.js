import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice.js";
import transactionsReducer from "../features/transactions/transactionsSlice.js";
import categoriesReducer from "../features/categories/categoriesSlice.js";
import reportsReducer from "../features/reports/reportsSlice.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
        transactions: transactionsReducer,
        categories: categoriesReducer,
        reports: reportsReducer,
    },
});