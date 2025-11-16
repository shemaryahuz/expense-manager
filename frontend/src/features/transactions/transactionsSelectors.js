
export const selectTransactionsState = (state) => state.transactions;

export const selectTransactions = (state) => selectTransactionsState(state).transactions;

export const selectCategoriesTransactions = (state) => selectTransactionsState(state).categoriesTransactions;