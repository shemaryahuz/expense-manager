import { createSlice } from "@reduxjs/toolkit";

const getInitialThemeMode = () => {
    const themeMode = localStorage.getItem("themeMode");
    return themeMode ? themeMode : "light";
};

const initialState = {
    themeMode: getInitialThemeMode(),
};

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        toggleThemeMode: (state) => {
            state.themeMode = state.themeMode === "light" ? "dark" : "light";
            localStorage.setItem("themeMode", state.themeMode);
        },
        setThemeMode: (state, action) => {
            state.themeMode = action.payload;
            localStorage.setItem("themeMode", state.themeMode);
        },
    },
});

export const selectThemeMode = (state) => state.settings.themeMode;

export const { toggleThemeMode, setThemeMode } = settingsSlice.actions;

export default settingsSlice.reducer;