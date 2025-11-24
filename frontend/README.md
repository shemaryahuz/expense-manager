# Expense Manager (Frontend)

React SPA that consumes the Expense Manager API to provide authentication, dashboards, and CRUD tools for categories and transactions.

## Tech Stack
- Vite + React 19 with StrictMode
- React Router v7 for routing guards (`PublicRoute`, `ProtectedRoute`)
- Redux Toolkit + Redux Thunk for state management
- Axios (base URL configured in `src/main.jsx`)
- Material UI v7, Emotion styling, custom theme

## Prerequisites
- Node.js 18+ and npm
- Backend API running locally on `http://localhost:3000` (or update `axios.defaults.baseURL`)

## Installation
```bash
cd frontend
npm install
```

## Local Development
```bash
npm run dev    # launches Vite on http://localhost:5173
```
The app expects the backend at `http://localhost:3000/api` and sends credentials with each request via `axios.defaults.withCredentials = true`.

## Additional Scripts
- `npm run build` – production build output under `dist/`
- `npm run preview` – preview the production build
- `npm run lint` – run ESLint (uses `eslint.config.js`)

## Environment & Configuration
- Update `src/main.jsx` if you change the backend origin:
  ```js
  axios.defaults.baseURL = "http://localhost:3000/api";
  ```
- Vite environment variables (`.env`) are not required by default, but you can override `VITE_API_URL` and read it before setting `axios.defaults.baseURL`.

## Application Structure
```
frontend/
  src/
    app/             # Redux store & reducers
    components/      # Layout + shared UI primitives
    features/        # Redux slices & thunks per domain (user, categories, transactions)
    pages/           # Route-level views (home, dashboard, categories, transactions)
    routes/          # Route guards
    theme/           # Material UI theme
    utiles/          # Domain helpers
```

### Routing
- `/` – public landing page with marketing copy and login/signup entry points.
- `/dashboard` – protected summary cards (monthly budget, top categories, latest transactions).
- `/transactions` – protected list with filters, create/edit/delete forms.
- `/categories` – protected category management (add/delete/update) plus transaction rollups.

Route access is controlled through `PublicRoute` and `ProtectedRoute`. Every protected route dispatches `getUser()` on app mount to validate the session cookie.

### State Management
- `src/app/store.js` configures Redux Toolkit with slices for `user`, `categories`, and `transactions`.
- Async thunks in `features/*Thunks.js` call the backend and propagate `pending/fulfilled/rejected` states for UI feedback (`Loader`, `Error`, `Success` components).

### UI & Styling
- Material UI components themed via `src/theme/theme.js`.
- Emotion `styled` definitions live beside components (e.g., `components/layout/styles`).
- Common feedback components (`Loader`, `Error`, `Feedback`, `Success`) ensure consistent UX.

## Testing the Flow
1. Start the backend (`npm start` in `backend/`).
2. Run `npm run dev` here.
3. Sign up via the Home page; a JWT cookie is stored automatically.
4. Explore dashboards, add categories/transactions, and verify the data persists in the backend `database/` JSON files.

For deeper backend/API details, see the repository root README and `backend/README.md`.