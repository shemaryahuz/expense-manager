# Expense Manager (Frontend)

React single-page application (SPA) that provides a modern, responsive interface for managing personal expenses. The frontend consumes the Expense Manager API to deliver authentication, dashboards, category management, and transaction workflows.

## Tech Stack

- **Vite 7** - Build tool and dev server
- **React 19** - UI library with StrictMode
- **React Router v7** - Client-side routing with route guards
- **Redux Toolkit** - State management with RTK Query patterns
- **Redux Thunk** - Async action creators
- **Axios** - HTTP client for API communication
- **Material UI v7** - Component library
- **Emotion** - CSS-in-JS styling
- **Day.js** - Date manipulation and formatting

## Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:3000` (or update base URL)

## Installation

```bash
cd frontend
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` with hot module replacement (HMR) enabled.

## Available Scripts

- **`npm run dev`** - Start Vite development server
- **`npm run build`** - Create production build in `dist/` directory
- **`npm run preview`** - Preview the production build locally
- **`npm run lint`** - Run ESLint to check code quality

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Redux store configuration
│   │   ├── rootReducer.js      # Combined reducers
│   │   └── store.js            # Redux store setup
│   │
│   ├── components/             # Reusable UI components
│   │   ├── common/             # Shared components
│   │   │   ├── AlertMessage.jsx
│   │   │   ├── Feedback.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── MonthHeader.jsx
│   │   └── layout/             # Layout components
│   │       ├── Footer.jsx
│   │       ├── Header.jsx
│   │       ├── Layout.jsx
│   │       └── Sidebar.jsx
│   │
│   ├── constants/              # Application constants
│   │   ├── api/
│   │   │   └── urlConstants.js # API endpoint URLs
│   │   ├── app/
│   │   │   ├── pages.js        # Page route definitions
│   │   │   └── routes.js       # Route paths and icons
│   │   ├── features/
│   │   │   ├── categoriesConstants.js
│   │   │   ├── statusConstants.js
│   │   │   └── transactionsConstants.js
│   │   └── ui/
│   │       ├── dashboardConstants.js
│   │       ├── dateConstants.js
│   │       ├── loginConstants.js
│   │       └── userConstants.js
│   │
│   ├── features/               # Redux feature slices
│   │   ├── categories/
│   │   │   ├── categoriesSelectors.js
│   │   │   ├── categoriesSlice.js
│   │   │   └── categoriesThunks.js
│   │   ├── transactions/
│   │   │   ├── transactionsSelectors.js
│   │   │   ├── transactionsSlice.js
│   │   │   └── transactionsThunks.js
│   │   └── user/
│   │       ├── userSlice.js
│   │       └── userThunks.js
│   │
│   ├── pages/                  # Route-level page components
│   │   ├── categories/
│   │   │   ├── CategoriesPage.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   └── ...
│   │   ├── dashboard/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── MonthlyBudget.jsx
│   │   │   └── ...
│   │   ├── home/
│   │   │   ├── HomePage.jsx
│   │   │   ├── PublicHome.jsx
│   │   │   └── PrivateHome.jsx
│   │   ├── transactions/
│   │   │   ├── TransactionsPage.jsx
│   │   │   ├── TransactionForm.jsx
│   │   │   └── ...
│   │   └── user/
│   │       ├── LoginForm.jsx
│   │       ├── AccountMenu.jsx
│   │       ├── ProfilePage.jsx
│   │       ├── ProfileHeader.jsx
│   │       ├── ProfileDetailsSection.jsx
│   │       ├── ProfilePasswordSection.jsx
│   │       ├── ProfileDeleteSection.jsx
│   │       └── DeleteAccountDialog.jsx
│   │
│   ├── routes/                 # Route guards
│   │   ├── ProtectedRoute.jsx  # Requires authentication
│   │   └── PublicRoute.jsx     # Redirects if authenticated
│   │
│   ├── theme/                  # Material UI theme
│   │   └── theme.js
│   │
│   ├── utiles/                 # Utility functions
│   │   ├── categoriesUtils.js
│   │   ├── monthUtils.js
│   │   └── transactionsUtils.js
│   │
│   ├── App.jsx                 # Root component with routing
│   └── main.jsx                # Application entry point
│
├── public/                     # Static assets
│   └── images/
│       └── money-management.svg
│
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
└── package.json
```

## Application Architecture

### State Management

The application uses **Redux Toolkit** for centralized state management:

- **Store**: Configured in `src/app/store.js`
- **Slices**: Feature-based slices in `src/features/`
  - `userSlice` - Authentication and user data
  - `categoriesSlice` - Category management
  - `transactionsSlice` - Transaction data
- **Thunks**: Async actions in `*Thunks.js` files
- **Selectors**: Memoized selectors in `*Selectors.js` files

### Routing

**React Router v7** handles client-side routing:

- **Public Routes**: Accessible without authentication
  - `/` - Home page (shows login/signup for unauthenticated users)
- **Protected Routes**: Require authentication
  - `/dashboard` - Financial overview and statistics
  - `/transactions` - Transaction list and management
  - `/categories` - Category management
  - `/profile` - Account settings (profile, password, delete account)

**Route Guards**:
- `PublicRoute` - Redirects authenticated users away from public pages
- `ProtectedRoute` - Redirects unauthenticated users to home page

### API Communication

**Axios** is configured in `src/main.jsx`:

```javascript
axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true; // Sends cookies with requests
```

All API calls are made through Redux thunks, which:
1. Dispatch loading states
2. Make HTTP requests
3. Handle success/error responses
4. Update Redux state accordingly

### UI Components

**Material UI v7** provides the component foundation:
- Themed via `src/theme/theme.js`
- Custom styled components using Emotion
- Responsive design with Material UI's grid system

**Common Components**:
- `Loader` - Loading spinner
- `AlertMessage` - Error/success messages
- `Feedback` - User feedback display
- `MonthHeader` - Month selector for filtering

## Pages

### Home Page (`/`)

- **Public**: Shows marketing content and login/signup forms
- **Authenticated**: Shows welcome message and navigation to dashboard
- Components: `HomePage`, `PublicHome`, `PrivateHome`, `LoginForm`

### Dashboard (`/dashboard`)

- **Protected**: Requires authentication
- **Features**:
  - Monthly budget overview (income vs expenses)
  - Top spending categories
  - Recent transactions list
  - Month selector for filtering
- Components: `DashboardPage`, `MonthlyBudget`, `TopCategoriesCard`, `LastTransactionsCard`

### Transactions (`/transactions`)

- **Protected**: Requires authentication
- **Features**:
  - List all transactions (sorted by date)
  - Create new transactions
  - Edit existing transactions
  - Delete transactions
  - Search by title
  - Filter by month
- Components: `TransactionsPage`, `TransactionForm`, `TransactionsList`, `TransactionRow`

### Categories (`/categories`)

- **Protected**: Requires authentication
- **Features**:
  - View all categories (user + defaults)
  - Create custom categories
  - Edit category names
  - Delete user-owned categories
  - View transactions per category
- Components: `CategoriesPage`, `CategoryCard`, `AddCategoryForm`, `CategoryTransactions`

### Profile / Account Settings (`/profile`)

- **Protected**: Requires authentication
- **Features**:
  - View current account details (name, email)
  - Update profile (name and email)
  - Update password
  - Delete account (with confirmation dialog)
- Behavior:
  - All actions use Redux thunks (`updateUser`, `updateUserPassword`, `deleteUser`, `logout`)
  - Status and feedback are displayed using `AlertMessage` and `Feedback`
  - After deleting the user, the app redirects to the home page where the login form is shown
- Components: `ProfilePage`, `ProfileHeader`, `ProfileDetailsSection`, `ProfilePasswordSection`, `ProfileDeleteSection`, `DeleteAccountDialog`

## Configuration

### API Base URL

The base API URL is defined in `src/constants/api/urlConstants.js` and is driven by a Vite environment variable:

```javascript
export const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";
```

### Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_INCOME_CATEGORY_ID=<your_income_category_id>
VITE_SUPABASE_MISC_CATEGORY_ID=<your_misc_category_id>
```

Vite requires the `VITE_` prefix for environment variables to be exposed to the client.

### Supabase Category IDs

The application treats two categories as **special defaults** stored in Supabase:

- **Income category** (`INCOME_ID`) – used for positive transactions
- **Miscellaneous category** (`MISCELLANEOUS_ID`) – fallback category for reassigned expenses

Because these IDs come from your own Supabase database, configure them through Vite environment variables:

1. In your Supabase project, create (or locate) the two default categories (e.g., `Income` and `Miscellaneous`) and note their `id` values.
2. Create or update `.env` in the `frontend/` directory:

```env
VITE_SUPABASE_INCOME_CATEGORY_ID=<your_income_category_id>
VITE_SUPABASE_MISC_CATEGORY_ID=<your_misc_category_id>
```

3. Restart the Vite dev server after changing `.env`:

```bash
npm run dev
```

If these variables are not set, the app will fall back to the legacy IDs `"c0"` (income) and `"c1"` (miscellaneous), which will **not** match your Supabase data. Always set these env variables when using your own Supabase database.

### Vite Configuration

The `vite.config.js` file configures:
- React plugin for JSX transformation
- Development server settings
- Build output configuration

## Styling

### Material UI Theme

The theme is defined in `src/theme/theme.js` and includes:
- Color palette
- Typography settings
- Component default props
- Custom breakpoints

### Emotion Styled Components

Custom styled components are co-located with their components:
- `components/layout/styles/` - Layout component styles
- `pages/*/styles/` - Page-specific styles

Example:
```javascript
import { styled } from "@emotion/styled";

export const StyledContainer = styled(Container)({
  padding: "2rem",
  // ... styles
});
```

## State Flow

### Authentication Flow

1. User submits login/signup form
2. `userThunks.js` dispatches async action
3. Axios sends request to backend with credentials
4. Backend sets JWT cookie
5. Redux state updates with user data
6. Router redirects to dashboard

### Data Fetching Flow

1. Component mounts or user action triggers fetch
2. Component dispatches thunk (e.g., `fetchTransactions()`)
3. Redux slice sets `status: 'loading'`
4. Axios makes API request
5. On success: slice updates with data, `status: 'succeeded'`
6. On error: slice sets error message, `status: 'failed'`
7. Component re-renders based on state

## Development Workflow

### Adding a New Feature

1. **Create Redux slice** in `src/features/[feature]/`
   - Define initial state
   - Create reducers
   - Export selectors

2. **Create thunks** for API calls
   - Define async actions
   - Handle loading/success/error states

3. **Create page component** in `src/pages/[feature]/`
   - Use Redux hooks (`useSelector`, `useDispatch`)
   - Handle loading and error states
   - Render UI components

4. **Add route** in `src/constants/app/pages.js`
   - Define route path
   - Import page component

5. **Update navigation** if needed
   - Add route to `src/constants/app/routes.js`

### Component Patterns

**Loading States**:
```javascript
const { status, transactions } = useSelector(selectTransactionsState);

if (status === LOADING) return <Loader />;
if (status === FAILED) return <AlertMessage severity="error" />;
```

**Form Handling**:
```javascript
const dispatch = useDispatch();
const handleSubmit = async (data) => {
  await dispatch(addTransaction(data));
};
```

## Testing the Application

### Manual Testing Flow

1. **Start backend**: `cd backend && npm start`
2. **Start frontend**: `cd frontend && npm run dev`
3. **Sign up**: Create a new account on the home page
4. **Explore**: Navigate to dashboard, add categories, create transactions
5. **Verify**: Check that data persists (refresh page, check backend JSON files)

### Common Issues

**API Connection Errors**:
- Verify backend is running on `http://localhost:3000`
- Check browser console for CORS errors
- Ensure `withCredentials: true` is set in Axios

**Authentication Issues**:
- Check that cookies are being set (DevTools → Application → Cookies)
- Verify JWT_SECRET matches backend configuration
- Clear cookies and try logging in again

**State Not Updating**:
- Check Redux DevTools for state changes
- Verify thunks are dispatching correctly
- Check browser console for errors

## Building for Production

### Create Production Build

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Deploying

The `dist/` directory contains static files that can be deployed to:
- **Netlify** - Drag and drop `dist/` folder
- **Vercel** - Connect GitHub repository
- **GitHub Pages** - Configure build output
- **Any static hosting** - Upload `dist/` contents

**Important**: Update the API base URL to point to your production backend before building.

## Code Quality

### ESLint

The project uses ESLint for code quality:

```bash
npm run lint
```

Configuration is in `eslint.config.js`.

### Best Practices

- Use Redux Toolkit patterns (slices, thunks, selectors)
- Keep components focused and reusable
- Use TypeScript for type safety (if migrating)
- Follow Material UI design guidelines
- Write accessible HTML (ARIA labels, semantic elements)

## Performance Optimization

- **Code Splitting**: React Router handles route-based code splitting
- **Memoization**: Redux selectors use `createSelector` for memoization
- **Lazy Loading**: Consider lazy loading heavy components
- **Image Optimization**: Optimize images in `public/images/`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

## Additional Resources

- [React Documentation](https://react.dev)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [Material UI Documentation](https://mui.com)
- [React Router Documentation](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)

For backend API documentation, see [`../backend/README.md`](../backend/README.md).
