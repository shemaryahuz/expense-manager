import { createSlice } from "@reduxjs/toolkit";

export const reportsSlice = createSlice({
    name: "reports",
    initialState: {
        reports: [],
        current: null,
    },
    reducers: {
        addReport: (state, action) => {
            state.reports.push(action.payload);
        },
    },
});

export const { addReport } = reportsSlice.actions;

export default reportsSlice.reducer;