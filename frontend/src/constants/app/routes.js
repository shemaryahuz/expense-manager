import { Home, Dashboard, Category, ReceiptLong } from "@mui/icons-material";

export const ROUTE_PATHS = {
    HOME: "",
    DASHBOARD: "dashboard",
    TRANSACTIONS: "transactions",
    CATEGORIES: "categories",
}

const ROUTE_NAMES = {
    HOME: "Home",
    DASHBOARD: "Dashboard",
    TRANSACTIONS: "Transactions",
    CATEGORIES: "Categories",
}

const ROUTE_ICONS = {
    HOME: Home,
    DASHBOARD: Dashboard,
    TRANSACTIONS: ReceiptLong,
    CATEGORIES: Category,
}

export const ROUTES = [
    {
        path: ROUTE_PATHS.HOME,
        name: ROUTE_NAMES.HOME,
        Icon: ROUTE_ICONS.HOME,
    },
    {
        path: ROUTE_PATHS.DASHBOARD,
        name: ROUTE_NAMES.DASHBOARD,
        Icon: ROUTE_ICONS.DASHBOARD,
    },
    {
        path: ROUTE_PATHS.TRANSACTIONS,
        name: ROUTE_NAMES.TRANSACTIONS,
        Icon: ROUTE_ICONS.TRANSACTIONS,
    },
    {
        path: ROUTE_PATHS.CATEGORIES,
        name: ROUTE_NAMES.CATEGORIES,
        Icon: ROUTE_ICONS.CATEGORIES,
    },
]