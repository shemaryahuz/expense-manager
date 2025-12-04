import { INCOME_ID } from "../constants/features/categoriesConstants";


export const getTopCategories = (categories, transactions, limit = 3) => {

    const categoriesIdToName = {};

    categories.forEach(({ id, name }) => {
        categoriesIdToName[id] = name;
    });

    const categoriesAmounts = {};

    transactions.forEach(({ categoryId, amount }) => {
        const category = categoriesIdToName[categoryId];

        if (category) {
            categoriesAmounts[category] ?
                categoriesAmounts[category] += amount :
                categoriesAmounts[category] = amount;
        }
    });

    const categoriesArray = Object.keys(categoriesAmounts).map((category) => ({
        name: category,
        amount: categoriesAmounts[category],
    }));

    categoriesArray.sort((prevCategory, nextCategory) => nextCategory.amount - prevCategory.amount);

    const topCategories = categoriesArray.slice(0, limit);

    return topCategories;
}

export const getCategoryName = (categories, id) =>
    categories.find((category) => category.id === id)?.name;