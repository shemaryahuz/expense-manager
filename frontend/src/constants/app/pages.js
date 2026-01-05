import HomePage from "../../pages/home/HomePage";
import DashboardPage from "../../pages/dashboard/DashboardPage";
import TransactionsPage from "../../pages/transactions/TransactionsPage";
import CategoriesPage from "../../pages/categories/CategoriesPage";
import ProfilePage from "../../pages/user/ProfilePage";

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
    {
        route: ROUTE_PATHS.PROFILE,
        Element: ProfilePage,
    },
];