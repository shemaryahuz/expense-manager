import { supabase } from "../config/supabase.js";

import { keysToCamel } from "../utils/caseConvertor.js";

const TABLE = "users";

export async function findUsers() {
    const { data, error } = await supabase
        .from(TABLE)
        .select("id, name, email, created_at, updated_at")
        .order("created_at", { ascending: false });

    if (error) throw error;

    return keysToCamel(data);
}

export async function findUserById(id) {
    const { data, error } = await supabase
        .from(TABLE)
        .select("id, name, email, created_at, updated_at")
        .eq("id", id)
        .single();

    if (error) return null;

    return keysToCamel(data);
}

export async function findUserByEmail(email) {
    const { data, error } = await supabase
        .from(TABLE)
        .select("id, name, email, password_hash, created_at")
        .eq("email", email)
        .single();

    if (error) return null;

    return keysToCamel(data);
}

export async function creatUser({ name, email, passwordHash }) {
    const { data, error } = await supabase
        .from(TABLE)
        .insert([{
            name,
            email,
            password_hash: passwordHash
        }])
        .select("id, email, name, created_at")
        .single();

    if (error) throw error;

    return keysToCamel(data);
}

export async function updateUserProfile(id, { name, email }) {
    const { data, error } = await supabase
        .from(TABLE)
        .update({
            name,
            email,
            updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select("id, email, name, created_at, updated_at")
        .single();

    if (error) throw error;

    return keysToCamel(data);
}

export async function updateUserPassword(id, { passwordHash }) {
    const { data, error } = await supabase
        .from(TABLE)
        .update({
            password_hash: passwordHash,
            updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select("id, email, name, created_at, updated_at")
        .single();

    if (error) throw error;

    return keysToCamel(data);
}

export async function deleteUserById(id) {
    const { error } = await supabase
        .from(TABLE)
        .delete()
        .eq("id", id);

    if (error) throw error;

    return true;
} 