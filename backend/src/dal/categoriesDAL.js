import { supabase } from "../config/supabase.js";

import { keysToCamel } from "../utils/caseConvertor.js";

const TABLE = "categories";

export async function findUserCategories(userId) {
    const { data, error } = await supabase
        .from(TABLE)
        .select("*")
        .or(`user_id.is.null, user_id.eq.${userId}`)
        .order("created_at", { ascending: true });

    if (error) throw error;

    return keysToCamel(data);
}

export async function findCategoryById(id) {
    const { data, error } = await supabase
        .from(TABLE)
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;

    return keysToCamel(data);
}

export async function createCategory({ name, userId }) {
    const { data, error } = await supabase
        .from(TABLE)
        .insert([{
            name,
            user_id: userId
        }])
        .select("*")
        .single();

    if (error) throw error;

    return keysToCamel(data);
}

export async function updateCategoryName(id, { name }) {
    const { data, error } = await supabase
        .from(TABLE)
        .update({ name })
        .eq("id", id)
        .select("*")
        .single();

    if (error) throw error;

    return keysToCamel(data);
}

export async function deleteCategoryById(id) {
    const { error } = await supabase.from(TABLE)
        .delete()
        .eq("id", id);

    if (error) throw error;

    return true;
}

export async function deleteUserCategories(userId) {
    const { error } = await supabase.from(TABLE)
        .delete()
        .eq("user_id", userId);

    if (error) throw error;

    return true;
}

export async function isDefaultCategort(id) {
    const category = await findCategoryById(id);
    return category && category.user_id === null;
}

export async function getMiscellaneousCategoryId() {
    const { data, error } = await supabase.from(TABLE)
        .select("id")
        .eq("name", "Miscellaneous")
        .is("user_id", null)
        .single();

    if (error) throw error;

    return data?.id;
}
