import { supabase } from "../config/supabase.js";

const USERS_TABLE_NAME = "users";

export async function findUsers() {
    const { data, error } = await supabase.from(USERS_TABLE_NAME)
        .select("id, name, email, created_at, updated_at")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function findUserById(id) {
    const { data, error } = await supabase.from(USERS_TABLE_NAME)
        .select("id, name, email, created_at, updated_at")
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function findUserByEmail(email) {
    const { data, error } = await supabase.from(USERS_TABLE_NAME)
        .select("id, name, email, password_hash, created_at")
        .eq("email", email)
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function creatUser({ name, email, passwordHash }) {
    const { data, error } = await supabase.from(USERS_TABLE_NAME)
        .insert([{
            name,
            email,
            password_hash: passwordHash
        }])
        .select("id, email, name, created_at")
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function updateUserProfile(id, { name, email }) {
    const { data, error } = await supabase.from(USERS_TABLE_NAME)
        .update({
            name,
            email,
            updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select("id, email, name, created_at, updated_at")
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function updateUserPassword(id, { passwordHash }) {
    const { data, error } = await supabase.from(USERS_TABLE_NAME)
        .update({
            password_hash: passwordHash,
            updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select("id, email, name, created_at, updated_at")
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function deleteUserById(id) {
    const { error } = await supabase.from(USERS_TABLE_NAME)
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        return false;
    }

    return true;
} 