import { describe, it, expect } from "vitest";

import { convertDatesToLocale, updateTransaction, sortTransactionsByDate, getTotalAmount } from "../transactionsUtils.js";

describe("transactions utils", () => {
    const transactions = [
        { id: 1, title: "Transaction 1", amount: 100, date: new Date("2026-01-01") },
        { id: 2, title: "Transaction 2", amount: 200, date: new Date("2026-02-01") },
        { id: 3, title: "Transaction 3", amount: 300, date: new Date("2026-03-01") },
    ];

    describe("convertDatesToLocale", () => {
        it("should convert dates to locale string", () => {
            const convertedTransactions = convertDatesToLocale(transactions);
            expect(convertedTransactions[0].date).toBe("1/1/2026");
            expect(convertedTransactions[1].date).toBe("2/1/2026");
            expect(convertedTransactions[2].date).toBe("3/1/2026");
        });
    });

    describe("updateTransaction", () => {
        it("should update transaction by id", () => {
            const updatedTransaction = { id: 1, title: "Updated Transaction", amount: 500, date: new Date("2026-04-01") };
            const updatedTransactions = updateTransaction(transactions, updatedTransaction);
            expect(updatedTransactions[0].title).toBe("Updated Transaction");
            expect(updatedTransactions[0].amount).toBe(500);
            expect(updatedTransactions[0].date).toBe("4/1/2026");
        });
    });

    describe("sortTransactionsByDate", () => {
        it("should sort transactions by date", () => {
            const sortedTransactions = sortTransactionsByDate(transactions);
            expect(sortedTransactions[0].id).toBe(3);
            expect(sortedTransactions[1].id).toBe(2);
            expect(sortedTransactions[2].id).toBe(1);
        });
    });

    describe("getTotalAmount", () => {
        it("should get total amount", () => {
            const totalAmount = getTotalAmount(transactions);
            expect(totalAmount).toBe(600);
        });
    });
});