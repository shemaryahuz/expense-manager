export const convertDatesToLocale = (transactions) =>
    transactions.map((transaction) => {
        const date = new Date(transaction.date);
        return {
            ...transaction,
            date: date.toLocaleDateString(),
        };
    });


export const getTotal = (transactions) => {
    return transactions.reduce((total, transaction) => {
        return total + transaction.amount;
    }, 0);
};