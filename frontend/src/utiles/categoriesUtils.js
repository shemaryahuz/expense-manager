

export const getTopCategories = (categories, transactions, n = 3) => {

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

    categoriesArray.sort((a, b) => b.amount - a.amount);

    const topCategories = categoriesArray.slice(0, n);

    return topCategories;
}