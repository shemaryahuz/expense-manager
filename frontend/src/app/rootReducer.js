import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice.js";
import transactionsReducer from "../features/transactions/transactionsSlice.js";
import categoriesReducer from "../features/categories/categoriesSlice.js";
import reportsReducer from "../features/reports/reportsSlice.js";


const appReducer = combineReducers({
    user: userReducer,
    transactions: transactionsReducer,
    categories: categoriesReducer,
    reports: reportsReducer,
})

const rootReducer = (state, action) => {
    if (action.type === "user/logout") {
        state = undefined;
    }
    return appReducer(state, action);
}

export default rootReducer;