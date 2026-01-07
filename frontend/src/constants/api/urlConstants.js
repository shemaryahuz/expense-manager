export const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const USER_URL = `${BASE_URL}/users`;
export const AUTH_URL = `${BASE_URL}/auth`;

export const TRANSACTION_URL = `${BASE_URL}/transactions`;
export const CATEGORY_URL = `${BASE_URL}/categories`;