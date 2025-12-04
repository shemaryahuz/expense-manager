import { INCOME_ID } from "../constants/features/categoriesConstants";


export const getTopCategories = (categories, transactions, limit = 3) => {

    const categoriesIdToName = {};

    categories.forEach((category) => {
        categoriesIdToName[category.id] = category.name;
    });

    const categoriesAmounts = {};

    transactions.forEach((transaction) => {
        const category = categoriesIdToName[transaction.categoryId];

        if (!category) {
            return;
        }

        if (!categoriesAmounts[category]) {
            categoriesAmounts[category] = 0;
        }

        categoriesAmounts[category] += transaction.amount;
    });

    const categoriesArray = Object.keys(categoriesAmounts).map((category) => ({
        name: category,
        amount: categoriesAmounts[category],
    }));

    categoriesArray.sort((prevCategory, nextCategory) => nextCategory.amount - prevCategory.amount);

    const topCategories = categoriesArray.slice(0, limit);

    return topCategories;
}

export const getIncomeCategories = (categories) =>
    categories.filter((category) => category.id === INCOME_ID);

export const getExpenseCategories = (categories) =>
    categories.filter((category) => category.id !== INCOME_ID);

export const getDefaultCategories = (categories) =>
    categories.filter((category) => category.id !== INCOME_ID && category.userId === null);

export const getCustomCategories = (categories, userId) =>
    categories.filter((category) => category.id !== INCOME_ID && category.userId === userId);