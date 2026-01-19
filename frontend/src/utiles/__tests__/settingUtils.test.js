import { describe, expect, it } from "vitest";

import {
    getStoredValue,
    setStoredValue,
    getInitialThemeMode,
    getInitialLanguage,
    getInitialCurrency
} from "../settingsUtils.js";

import { STORAGE_KEYS, THEMES, LANGUAGES, CURRENCIES } from "../../constants/features/settingsConstants.js";

const { THEME_MODE, LANGUAGE, CURRENCY } = STORAGE_KEYS;
const { LIGHT, DARK } = THEMES;
const { ENGLISH, HEBREW } = LANGUAGES;
const { USD, ILS } = CURRENCIES;

describe("settingsUtils", () => {
    it("getStoredValue", () => {
        expect(getStoredValue(THEME_MODE, LIGHT)).toBe(LIGHT);
        expect(getStoredValue(LANGUAGE, ENGLISH)).toBe(ENGLISH);
        expect(getStoredValue(CURRENCY, USD)).toBe(USD);
    });

    it("setStoredValue", () => {
        setStoredValue(THEME_MODE, DARK);
        setStoredValue(LANGUAGE, HEBREW);
        setStoredValue(CURRENCY, ILS);

        expect(getStoredValue(THEME_MODE, LIGHT)).toBe(DARK);
        expect(getStoredValue(LANGUAGE, ENGLISH)).toBe(HEBREW);
        expect(getStoredValue(CURRENCY, USD)).toBe(ILS);

        localStorage.removeItem(THEME_MODE);
        localStorage.removeItem(LANGUAGE);
        localStorage.removeItem(CURRENCY);
    });

    it("getInitialThemeMode", () => {
        expect(getInitialThemeMode()).toBe(LIGHT);
    });

    it("getInitialLanguage", () => {
        expect(getInitialLanguage()).toBe(ENGLISH);
    });

    it("getInitialCurrency", () => {
        expect(getInitialCurrency()).toBe(USD);
    });
});