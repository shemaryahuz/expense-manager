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
        expect(getStoredValue(LANGUAGE, HEBREW)).toBe(HEBREW);
        expect(getStoredValue(CURRENCY, ILS)).toBe(ILS);
    });

    it("setStoredValue", () => {
        setStoredValue(THEME_MODE, DARK);
        setStoredValue(LANGUAGE, ENGLISH);
        setStoredValue(CURRENCY, USD);

        expect(getStoredValue(THEME_MODE, LIGHT)).toBe(DARK);
        expect(getStoredValue(LANGUAGE, HEBREW)).toBe(ENGLISH);
        expect(getStoredValue(CURRENCY, ILS)).toBe(USD);

        localStorage.removeItem(THEME_MODE);
        localStorage.removeItem(LANGUAGE);
        localStorage.removeItem(CURRENCY);
    });

    it("getInitialThemeMode", () => {
        expect(getInitialThemeMode()).toBe(LIGHT);
    });

    it("getInitialLanguage", () => {
        expect(getInitialLanguage()).toBe(HEBREW);
    });

    it("getInitialCurrency", () => {
        expect(getInitialCurrency()).toBe(ILS);
    });
});