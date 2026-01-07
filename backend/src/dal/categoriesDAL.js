import { supabase } from "../config/supabase.js";

const CATEGORIES_TABLE_NAME = "categories";

export async function findUserCategories(userId) {
    const { data, error } = await supabase.from(CATEGORIES_TABLE_NAME)
        .select("*")
        .or(`user_id.is.null, user_id.eq.${userId}`)
        .order("created_at", { ascending: true });

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function findCategoryById(id) {
    const { data, error } = await supabase.from(CATEGORIES_TABLE_NAME)
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function createCategory({ name, userId }) {
    const { data, error } = await supabase.from(CATEGORIES_TABLE_NAME)
        .insert([{
            name,
            user_id: userId
        }])
        .select("*")
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function updateCategoryName(id, { name }) {
    const { data, error } = await supabase.from(CATEGORIES_TABLE_NAME)
        .update({ name })
        .eq("id", id)
        .select("*")
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function deleteCategoryById(id) {
    const { error } = await supabase.from(CATEGORIES_TABLE_NAME)
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        return false;
    }

    return true;
}

export async function deleteUserCategories(userId) {
    const { error } = await supabase.from(CATEGORIES_TABLE_NAME)
        .delete()
        .eq("user_id", userId);

    if (error) {
        console.error(error);
        return false;
    }

    return true;
}

export async function isDefaultCategort(id) {
    const category = await findCategoryById(id);
    return category && category.user_id === null;
}

export async function getMiscellaneousCategoryId() {
    const { data, error } = await supabase.from(CATEGORIES_TABLE_NAME)
        .select("id")
        .eq("name", "Miscellaneous")
        .is("user_id", null)
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data?.id;
}
