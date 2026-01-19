import { describe, it, expect } from "vitest";

import { getTopCategories, getCategoryName } from "../categoriesUtils.js";

describe("categories utils", () => {
    const categories = [
        { id: 1, name: "Category 1" },
        { id: 2, name: "Category 2" },
        { id: 3, name: "Category 3" },
        { id: 4, name: "Category 4" },
        { id: 5, name: "Category 5" },
    ];

    const transactions = [
        { categoryId: 1, amount: 100 },
        { categoryId: 2, amount: 200 },
        { categoryId: 3, amount: 300 },
        { categoryId: 4, amount: 400 },
        { categoryId: 5, amount: 500 },
    ];

    describe("getTopCategories", () => {
        it("should get top categories", () => {
            const topCategories = getTopCategories(categories, transactions, 3);
            expect(topCategories.length).toBe(3);
            expect(topCategories[0].name).toBe("Category 5");
            expect(topCategories[1].name).toBe("Category 4");
            expect(topCategories[2].name).toBe("Category 3");
        });
    });

    describe("getCategoryName", () => {
        it("should get category name", () => {
            const categoryName = getCategoryName(categories, 1);
            expect(categoryName).toBe("Category 1");
        });
    });
});