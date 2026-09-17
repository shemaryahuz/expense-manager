import { STORAGE_KEYS, THEMES, LANGUAGES, CURRENCIES, DIRECTIONS } from "../constants/features/settingsConstants";

const { THEME_MODE, LANGUAGE, CURRENCY } = STORAGE_KEYS;
const { LIGHT } = THEMES;
const { HEBREW } = LANGUAGES;
const { ILS } = CURRENCIES;
const { LTR, RTL } = DIRECTIONS;

export const getStoredValue = (key, defaultValue) => localStorage.getItem(key) || defaultValue;

export const setStoredValue = (key, value) => localStorage.setItem(key, value);

export const getInitialThemeMode = () => getStoredValue(THEME_MODE, LIGHT);

export const getInitialLanguage = () => getStoredValue(LANGUAGE, HEBREW);

export const getDirection = (language) => language === HEBREW ? RTL : LTR;

export const getInitialCurrency = () => getStoredValue(CURRENCY, ILS);

export const getCurrencySymbol = (currency) => currency === ILS ? "₪" : "$";