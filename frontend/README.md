# Expense Manager Frontend

Modern React single-page application for personal expense tracking. Features multi-language support, theme customization, and responsive Material UI design.

## Tech Stack

- **Vite 7** - Build tool and dev server
- **React 19** - UI framework with StrictMode
- **React Router v7** - Client-side routing with guards
- **Redux Toolkit** - State management
- **Material UI v7** - Component library
- **Emotion** - CSS-in-JS with RTL support
- **Axios** - HTTP client
- **Day.js** - Date manipulation

## Prerequisites

- Node.js 18+
- npm 9+
- Backend API running (default: `http://localhost:3000`)

## Installation

```bash
cd frontend
npm install
```

## Configuration

Create `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:3000/api
```

**Optional:** If using specific Supabase category IDs:

```env
VITE_SUPABASE_INCOME_CATEGORY_ID=your-income-category-uuid
VITE_SUPABASE_MISC_CATEGORY_ID=your-misc-category-uuid
VITE_SUPABASE_FIXED_CATEGORY_ID=your-fixed-expenses-category-uuid
```

## Development

Start the development server:

```bash
npm run dev
```

Application available at `http://localhost:5173` with hot module replacement (HMR).

## Testing

The frontend includes unit tests for components and utility functions using Vitest and React Testing Library.

### Test Setup

Tests use:

- **Vitest** - Fast unit test framework for Vite
- **@testing-library/react** - React component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers for DOM
- **jsdom** - DOM implementation for Node.js

### Running Tests

```bash
npm test                # Run all tests once
npm run test:watch      # Run in watch mode with UI
```

### Test Coverage

The test suite includes **16 tests** across **5 test files**:

**Component Tests**

- `Loader.test.jsx` (2 tests) - Tests loader rendering and visibility
- `AlertMessage.test.jsx` (3 tests) - Tests alert message display and types

**Utility Tests**

- `transactionsUtils.test.js` (4 tests) - Transaction calculations (income, expense, balance)
- `categoriesUtils.test.js` (2 tests) - Category filtering and operations
- `settingsUtils.test.js` (5 tests) - Currency symbols, RTL detection, formatting

### Test Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── common/
│   │       └── __tests__/
│   │           ├── Loader.test.jsx
│   │           └── AlertMessage.test.jsx
│   │
│   ├── utils/
│   │   └── __tests__/
│   │       ├── transactionsUtils.test.js
│   │       ├── categoriesUtils.test.js
│   │       └── settingsUtils.test.js
│   │
│   └── test/
│       ├── setup.js              # Test configuration
│       ├── TestProvider.jsx      # Test providers (MUI Theme)
```

### Test Configuration

**`vitest.config.js`:**

```javascript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",
  },
});
```

**Test Setup (`src/test/setup.js`):**

```javascript
import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock useTranslation hook
vi.mock("../hooks/i18n.js", () => ({
  useTranslation: () => ({
    translate: (key) => key,
  }),
}));

afterEach(() => {
  cleanup();
});
```

**Test Provider (`src/test/TestProvider.jsx`):**

```javascript
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({ palette: { mode: "light" } });

export const TestProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
```

### Writing New Tests

**Component Test Example:**

```javascript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestProvider } from "../../../test/TestProvider";
import MyComponent from "../MyComponent";

describe("MyComponent", () => {
  it("should render correctly", () => {
    render(
      <TestProvider>
        <MyComponent />
      </TestProvider>,
    );

    const element = screen.getByText("Expected Text");
    expect(element).toBeInTheDocument();
  });
});
```

**Utility Test Example:**

```javascript
import { describe, it, expect } from "vitest";
import { myUtilFunction } from "../myUtils";

describe("myUtilFunction", () => {
  it("should return expected result", () => {
    const result = myUtilFunction(input);
    expect(result).toBe(expectedOutput);
  });
});
```

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Create production build (`dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code quality checks
- `npm test` - Run all tests once
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── axios.js                  # Axios configuration
│   │
│   ├── app/
│   │   ├── rootReducer.js            # Combined reducers
│   │   └── store.js                  # Redux store setup
│   │
│   ├── components/
│   │   ├── common/                   # Shared UI components
│   │   │   ├── __tests__/
│   │   │   │   ├── AlertMessage.test.jsx
│   │   │   │   └── Loader.test.jsx
│   │   │   ├── AlertMessage.jsx
│   │   │   ├── Feedback.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── MonthHeader.jsx
│   │   │
│   │   └── layout/                   # Layout components
│   │       ├── CurrencyMenu.jsx
│   │       ├── Footer.jsx
│   │       ├── Header.jsx
│   │       ├── LanguageMenu.jsx
│   │       ├── Layout.jsx
│   │       └── Sidebar.jsx
│   │
│   ├── constants/
│   │   ├── api/                      # API URLs
│   │   ├── app/                      # Routes and pages
│   │   ├── features/                 # Feature constants
│   │   ├── i18n/                     # Translations
│   │   └── ui/                       # UI constants
│   │
│   ├── features/
│   │   ├── categories/
│   │   │   ├── categoriesSelectors.js
│   │   │   ├── categoriesSlice.js
│   │   │   └── categoriesThunks.js
│   │   │
│   │   ├── settings/
│   │   │   └── settingsSlice.js
│   │   │
│   │   ├── transactions/
│   │   │   ├── transactionsSelectors.js
│   │   │   ├── transactionsSlice.js
│   │   │   └── transactionsThunks.js
│   │   │
│   │   └── user/
│   │       ├── userSlice.js
│   │       └── userThunks.js
│   │
│   ├── hooks/
│   │   └── i18n.js                   # Translation hook
│   │
│   ├── pages/
│   │   ├── categories/               # Category management
│   │   ├── dashboard/                # Dashboard page
│   │   ├── home/                     # Landing page
│   │   ├── transactions/             # Transaction management
│   │   └── user/                     # Profile and auth
│   │
│   ├── providers/
│   │   └── AppProviders.jsx          # Context providers
│   │
│   ├── routes/
│   │   ├── ProtectedRoute.jsx        # Auth-required guard
│   │   └── PublicRoute.jsx           # Public-only guard
│   │
│   ├── test/                         # Test configuration
│   │   ├── setup.js                  # Vitest setup
│   │   └── TestProvider.jsx          # Test providers
│   │
│   │
│   ├── theme/
│   │   ├── rtlCache.js               # RTL emotion cache
│   │   └── theme.js                  # MUI theme config
│   │
│   ├── utils/
│   │   ├── __tests__/
│   │   │   ├── categoriesUtils.test.js
│   │   │   ├── settingsUtils.test.js
│   │   │   └── transactionsUtils.test.js
│   │   ├── categoriesUtils.js
│   │   ├── monthUtils.js
│   │   ├── settingsUtils.js
│   │   └── transactionsUtils.js
│   │
│   ├── App.jsx                       # Root component
│   └── main.jsx                      # Entry point
│
├── public/
│   └── images/
│       └── money-management.svg
│
├── index.html
├── package.json
├── vite.config.js
├── vitest.config.js
└── .env
```

## Features

### Multi-Language Support

Switch between English and Hebrew (עברית) with full RTL layout support.

**Implementation:**

- Language selector in header
- Translations stored in Redux settings slice
- `useTranslation()` hook for accessing translations
- RTL emotion cache automatically switches based on language direction

**Usage:**

```javascript
import { useTranslation } from "../hooks/i18n";

function MyComponent() {
  const { translate } = useTranslation();

  return <h1>{translate("WELCOME")}</h1>;
}
```

### Theme Toggle

Light and dark mode toggle with persistence.

**Storage:** `localStorage.themeMode` (`"light"` or `"dark"`)

**Implementation:**

- Theme selector in header
- Managed by Redux settings slice
- Applied via MUI `ThemeProvider`

### Currency Support

USD ($) and ILS (₪) with symbol display across all monetary values.

**Storage:** `localStorage.currency` (`"USD"` or `"ILS"`)

**Implementation:**

- Currency menu in header (visible when authenticated)
- Managed by Redux settings slice
- Symbol used in transaction forms, lists, and dashboard

**Usage:**

```javascript
import { useSelector } from "react-redux";
import { selectCurrency } from "../features/settings/settingsSlice";

function TransactionAmount() {
  const { symbol } = useSelector(selectCurrency);

  return (
    <span>
      {symbol}
      {amount}
    </span>
  );
}
```

### Responsive Design

Mobile-optimized layouts with Material UI breakpoints:

- Adaptive header and navigation
- Responsive transaction forms
- Mobile-friendly tables and cards

## Routes

### Public Routes

- `/` - Home/landing page with login

### Protected Routes

- `/dashboard` - Monthly budget overview
- `/transactions` - Transaction list and management
- `/categories` - Category management
- `/profile` - Account settings

**Route Guards:**

- `ProtectedRoute` - Requires authentication
- `PublicRoute` - Redirects authenticated users to dashboard

## State Management

### Redux Slices

**User (`features/user`)**

- Authentication state
- User profile data
- Login/logout actions

**Categories (`features/categories`)**

- Category list
- CRUD operations
- System vs custom categories

**Transactions (`features/transactions`)**

- Transaction list
- Filter and search state
- CRUD operations

**Settings (`features/settings`)**

- Theme mode (light/dark)
- Language (en/he) and direction (ltr/rtl)
- Currency (USD/ILS) and symbol
- Translations object

### Selectors

Use selectors for derived state:

```javascript
import { selectUserCategories } from "../features/categories/categoriesSelectors";
import { useSelector } from "react-redux";

const userCategories = useSelector(selectUserCategories);
```

### Thunks

Async actions for API calls:

```javascript
import { fetchTransactions } from "../features/transactions/transactionsThunks";
import { useDispatch } from "react-redux";

const dispatch = useDispatch();
dispatch(fetchTransactions());
```

## API Integration

Axios configured in `src/api/axios.js`:

```javascript
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
```

**Cookie Handling:**

- JWT tokens sent automatically via cookies
- `withCredentials: true` enables cookie sharing

## Internationalization (i18n)

### Adding Translations

Edit `src/constants/i18n/translations.js`:

```javascript
export const translations = {
  WELCOME: "ברוך הבא",
  DASHBOARD: "לוח בקרה",
};
```

### Using Translations

```javascript
const { translate } = useTranslation();

// In JSX
<Button>{translate("SAVE")}</Button>;

// Dynamic keys
const key = isIncome ? "INCOME" : "EXPENSE";
<Typography>{translate(key)}</Typography>;
```

## RTL Support

Automatic RTL layout for Hebrew:

**Emotion Cache:**

- `createRtlCache()` - RTL support with stylis-plugin-rtl
- `createLtrCache()` - Standard LTR cache

**Direction Changes:**

- Settings slice updates `direction` state
- `main.jsx` recreates emotion cache
- App re-renders with correct layout

## Local Storage

Application persists user preferences:

| Key         | Values                | Description         |
| ----------- | --------------------- | ------------------- |
| `themeMode` | `"light"` \| `"dark"` | Theme preference    |
| `language`  | `"en"` \| `"he"`      | UI language         |
| `currency`  | `"USD"` \| `"ILS"`    | Currency preference |

## Component Patterns

### Page Components

Pages compose smaller components and connect to Redux:

```javascript
function DashboardPage() {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return <Dashboard data={transactions} />;
}
```

### Form Components

Forms use controlled inputs with local state:

```javascript
function TransactionForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, amount });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Styled Components

Use Material UI's `styled` or inline `sx` prop:

```javascript
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));
```

## Testing the Application

1. Start backend: `cd ../backend && npm start`
2. Start frontend: `npm run dev`
3. Open `http://localhost:5173`
4. Test features:
   - Sign up and log in
   - Toggle theme (light/dark)
   - Switch language (English/Hebrew)
   - Change currency (USD/ILS)
   - Create transactions
   - Verify persistence across page reloads

## Building for Production

```bash
npm run build
```

Output in `dist/` directory.

**Preview build:**

```bash
npm run preview
```

**Environment:**

- Ensure `VITE_API_URL` points to production backend
- Update category IDs if using Supabase constants

## Troubleshooting

### Styles Broken After Language Switch

- Check emotion cache is recreated in `main.jsx`
- Verify `direction` state updates correctly
- Try hard refresh (Ctrl+Shift+R)

### Currency Not Updating

- Check Redux DevTools for settings state
- Verify `localStorage.currency` value
- Ensure components use `selectCurrency` selector

### Translations Missing

- Verify key exists in `translations.js`
- Check language matches key structure
- Use fallback: `translate(key) || key`

### API Errors

- Confirm backend is running
- Check `VITE_API_URL` in `.env`
- Verify CORS allows frontend origin
- Check browser console for errors

### Authentication Issues

- Ensure `withCredentials: true` in axios config
- Check cookies in browser DevTools
- Verify backend cookie settings

## Development Tips

- Use Redux DevTools for state inspection
- Check Network tab for API requests
- Use React DevTools for component hierarchy
- Enable ESLint in your editor
- Test both LTR and RTL layouts
- Verify responsive design at different breakpoints

## Performance Optimization

- Components use React.memo where appropriate
- Redux selectors prevent unnecessary re-renders
- Images optimized and lazy-loaded
- Code splitting with React Router
- Production build minified and tree-shaken

## Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus management in modals
- Color contrast meets WCAG standards

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Support

For issues or questions, refer to the [main documentation](../README.md) or open an issue on GitHub.
