// category IDs are stored in supabase and provided via Vite environment variables.
// this allows each environment (local/production) to use its own supabase project.
export const INCOME_ID =
  import.meta.env.VITE_SUPABASE_INCOME_CATEGORY_ID || "c0";
export const MISCELLANEOUS_ID =
  import.meta.env.VITE_SUPABASE_MISC_CATEGORY_ID || "c1";

export const GROUP_NAMES = {
    INCOME: "Income",
    DEFAULTS: "Defaults",
    CUSTOM: "Custom"
}