import { createSlice } from "@reduxjs/toolkit";

import {
    getInitialCurrency,
    getInitialLanguage,
    getInitialThemeMode,
    getDirection,
    getCurrencySymbol,
    setStoredValue
} from "../../utiles/settingsUtils";

import {
    DIRECTIONS,
    LANGUAGES,
    STORAGE_KEYS,
    THEMES
} from "../../constants/features/settingsConstants";

const { THEME_MODE, LANGUAGE, CURRENCY } = STORAGE_KEYS;
const { LIGHT, DARK } = THEMES;
const { HEBREW } = LANGUAGES;
const { LTR, RTL } = DIRECTIONS;

const initialLanguage = getInitialLanguage();

const initialState = {
    themeMode: getInitialThemeMode(),
    language: initialLanguage,
    direction: getDirection(initialLanguage),
    currency: getInitialCurrency(),
};

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        toggleThemeMode: (state) => {
            state.themeMode = state.themeMode === LIGHT ? DARK : LIGHT;
            setStoredValue(THEME_MODE, state.themeMode);
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
            state.direction = action.payload === HEBREW ? RTL : LTR;
            setStoredValue(LANGUAGE, state.language);
        },
        setCurrency: (state, action) => {
            state.currency = action.payload;
            setStoredValue(CURRENCY, state.currency);
        },
    },
});

export const selectThemeMode = (state) => state.settings.themeMode;
export const selectLanguage = (state) => state.settings.language;
export const selectDirection = (state) => state.settings.direction;
export const selectCurrency = (state) => ({
    currency: state.settings.currency,
    symbol: getCurrencySymbol(state.settings.currency)
});

export const { toggleThemeMode, setLanguage, setCurrency } = settingsSlice.actions;

export default settingsSlice.reducer;