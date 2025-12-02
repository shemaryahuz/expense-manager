import HomePage from "../../pages/home/HomePage";
import DashboardPage from "../../pages/dashboard/DashboardPage";
import TransactionsPage from "../../pages/transactions/TransactionsPage";
import CategoriesPage from "../../pages/categories/CategoriesPage";

import { ROUTE_PATHS } from "./routes";

export const PUBLIC_PAGES = [
    {
        route: ROUTE_PATHS.HOME,
        Element: HomePage,
    },
];

export const PRIVATE_PAGES = [
    {
        route: ROUTE_PATHS.DASHBOARD,
        Element: DashboardPage,
    },
    {
        route: ROUTE_PATHS.TRANSACTIONS,
        Element: TransactionsPage,
    },
    {
        route: ROUTE_PATHS.CATEGORIES,
        Element: CategoriesPage,
    },
];