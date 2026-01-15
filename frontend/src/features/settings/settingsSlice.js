import { createSlice } from "@reduxjs/toolkit";

import { translations } from "../../constants/i18n/translations";

const getInitialThemeMode = () => {
    const themeMode = localStorage.getItem("themeMode");
    return themeMode || "light";
};

const getInitialLanguage = () => {
    const storedLanguage = localStorage.getItem("language");
    return storedLanguage === "he" ? storedLanguage : "en";
};

const getInitialCurrency = () => {
    const storedCurrency = localStorage.getItem("currency") || "USD";
    return {
        currency: storedCurrency,
        symbol: storedCurrency === "USD" ? "$" : "₪",
    }
};

const initialLanguage = getInitialLanguage();

const initialState = {
    themeMode: getInitialThemeMode(),
    language: initialLanguage,
    direction: initialLanguage === "he" ? "rtl" : "ltr",
    translations,
    currency: getInitialCurrency(),
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
        setCurrency: (state, action) => {
            state.currency = action.payload;
            localStorage.setItem("currency", state.currency.currency);
        },
    },
});

export const selectThemeMode = (state) => state.settings.themeMode;
export const selectLanguage = (state) => state.settings.language;
export const selectDirection = (state) => state.settings.direction;
export const selectTranslations = (state) => state.settings.translations;
export const selectCurrency = (state) => state.settings.currency;


export const { toggleThemeMode, setThemeMode, setLanguage, toggleLanguage, setCurrency } = settingsSlice.actions;

export default settingsSlice.reducer;