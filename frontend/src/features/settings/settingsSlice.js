import { createSlice } from "@reduxjs/toolkit";

import { translations } from "../../constants/i18n/translations";

const getInitialThemeMode = () => {
    const themeMode = localStorage.getItem("themeMode");
    return themeMode === "dark" ? themeMode : "light";
};

const getInitialLanguage = () => {
    const storedLanguage = localStorage.getItem("language");
    return storedLanguage === "he" ? storedLanguage : "en";
};

const initialLanguage = getInitialLanguage();

const initialState = {
    themeMode: getInitialThemeMode(),
    language: initialLanguage,
    direction: initialLanguage === "he" ? "rtl" : "ltr",
    translations,
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
        setLanguage: (state, action) => {
            state.language = action.payload;
            state.direction = action.payload === "he" ? "rtl" : "ltr";
            localStorage.setItem("language", state.language);
        },
        toggleLanguage: (state) => {
            state.language = state.language === "en" ? "he" : "en";
            state.direction = state.language === "he" ? "rtl" : "ltr";
            localStorage.setItem("language", state.language);
        },
    },
});

export const selectThemeMode = (state) => state.settings.themeMode;
export const selectLanguage = (state) => state.i18n.language;
export const selectDirection = (state) => state.i18n.direction;
export const selectTranslations = (state) => state.i18n.translations;


export const { toggleThemeMode, setThemeMode, setLanguage, toggleLanguage } = settingsSlice.actions;

export default settingsSlice.reducer;