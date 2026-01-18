import { supabase } from "../config/supabase.js";

import { keysToCamel } from "../utils/caseConvertor.js";

const TABLE = "transactions";

export async function findUserTransactions(userId) {
    const { data, error } = await supabase
        .from(TABLE)
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) throw error;

    return keysToCamel(data);
}

export async function findTransactionsByMonth(userId, year, month) {
    const startDate = new Date(year, month - 1, 1).toISOString();
    const endDate = new Date(year, month, 0, 23, 59).toISOString();

    const { data, error } = await supabase
        .from(TABLE)
        .select("*")
        .eq("user_id", userId)
        .gte("date", startDate)
        .lte("date", endDate)
        .order("created_at", { ascending: false });

    if (error) throw error;

    return keysToCamel(data);
}

export async function searchTransactionsByTitle(userId, searchTerm) {
    const { data, error } = await supabase
        .from(TABLE)
        .select("*")
        .eq("user_id", userId)
        .ilike("title", `%${searchTerm}%`)
        .order("created_at", { ascending: false });

    if (error) throw error;

    return keysToCamel(data);
}

export async function createTransaction({
    userId,
    categoryId,
    title,
    type,
    amount,
    date
}) {
    const { data, error } = await supabase
        .from(TABLE)
        .insert({
            user_id: userId,
            category_id: categoryId,
            title,
            type,
            amount,
            date
        })
        .select("*")
        .single();

    if (error) throw error;

    return keysToCamel(data);
}

export async function updateTransactionById(id, {
    categoryId,
    title,
    type,
    amount,
    date
}) {
    const { data, error } = await supabase
        .from(TABLE)
        .update({
            category_id: categoryId,
            title,
            type,
            amount,
            date,
            updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select("*")
        .single();

    if (error) throw error;

    return keysToCamel(data);
}

export async function updateTransactionsCategoryId(curCategoryId, newCategoryId) {
    const { data, error } = await supabase
        .from(TABLE)
        .update({
            category_id: newCategoryId,
            updated_at: new Date().toISOString()
        })
        .eq("category_id", curCategoryId)
        .select("*");

    if (error) throw error;

    return keysToCamel(data);
}

export async function deleteTransactionById(id) {
    const { error } = await supabase
        .from(TABLE)
        .delete()
        .eq("id", id)
        .select("*")
        .single();

    if (error) throw error;

    return true;
}

export async function deleteUserTransactions(userId) {
    const { error } = await supabase
        .from(TABLE)
        .delete()
        .eq("user_id", userId);

    if (error) throw error;

    return true;
}