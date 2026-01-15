# Expense Manager (Frontend)

React single-page application (SPA) that provides a modern, responsive interface for managing personal expenses. The frontend consumes the Expense Manager API to deliver authentication, dashboards, category management, and transaction workflows.

## Tech Stack

- Vite 7 - Build tool and dev server
- React 19 with StrictMode
- React Router v7 - Client-side routing with route guards
- Redux Toolkit - State management
- Axios - HTTP client
- Material UI v7 - Component library
- Emotion - CSS-in-JS (with RTL cache support)
- Day.js - Date manipulation

## Prerequisites

- Node.js 18+ and npm 9+
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

- `npm run dev` - Start Vite development server
- `npm run build` - Create production build in `dist/` directory
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure (high level)

```
frontend/
├── src/
│   ├── app/                    # Redux store configuration
│   ├── components/             # Reusable UI components
│   ├── constants/              # Application constants
│   ├── features/               # Redux feature slices
│   ├── hooks/                  # Custom hooks
│   ├── pages/                  # Route-level page components
│   ├── theme/                  # Material UI theme + rtlCache
│   ├── App.jsx                 # Root component with routing
│   └── main.jsx                # Application entry point
├── public/
├── index.html
└── package.json
```

## Key Frontend Features

- Theme toggle

  - Toggle light/dark from the app header.
  - Persisted to `localStorage.themeMode`.
  - Theme is applied using MUI `ThemeProvider`.

- Language and RTL support

  - Language menu with English (`en`) and Hebrew (`he`).
  - Changing language updates:
    - The `language` in the settings slice
    - The `direction` (`ltr` or `rtl`) in the settings slice
    - The active translations returned by `useTranslation()`
  - The app uses a dedicated Emotion cache for RTL (`mui-rtl`) so MUI components are correctly mirrored when `direction === 'rtl'`.
  - `main.jsx` recreates the correct cache when `direction` changes and re-renders the app.

- Currency selector

  - Currency menu with USD ($) and ILS (₪).
  - Changing currency updates an object in the settings slice: `{ currency: "USD" | "ILS", symbol: "$" | "₪" }`.
  - The selected `symbol` is used across the UI (transaction lists, amount inputs, labels).
  - The currency menu/button is rendered only when the user is logged in (the header component controls visibility based on auth state).
  - Currency preference persists to `localStorage.currency` (stored as `"USD"` or `"ILS"`).

- Responsive design
  - UI/layout updates to improve usability on small/mobile screens.
  - Header and menus are adaptive; transaction forms and lists have responsive breakpoints.

## Local Storage Keys

- `themeMode` - "light" | "dark"
- `language` - "en" | "he"
- `currency` - "USD" | "ILS"

## How i18n works (short)

- `translations` object is stored in the settings slice and made available to the app.
- `useTranslation()` returns `{ translate }` where `translate(key)` reads from `translations[language][key]` (or falls back to the key).
- Components call `translate("SOME_KEY")` to render localized strings.
- When language changes, the settings slice updates `language` and `direction` and the app re-renders with the correct emotion cache and theme direction.

## Emotion RTL cache

- `src/theme/rtlCache.js` exposes:
  - `createRtlCache()` - returns an emotion cache with `stylis-plugin-rtl` and key `mui-rtl`
  - `createLtrCache()` - returns a normal emotion cache with key `mui`
- `main.jsx` selects the cache based on `direction` and wraps the app with `CacheProvider` so MUI components render correctly for RTL.

## API & Environment Variables

The frontend expects the backend API base URL from Vite env:

Create `.env` in `frontend/`:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_INCOME_CATEGORY_ID=<your_income_category_id>
VITE_SUPABASE_MISC_CATEGORY_ID=<your_misc_category_id>
VITE_SUPABASE_FIXED_CATEGORY_ID=<your_fixed_expenses_category_id>
```

- `VITE_API_URL` - base API URL (defaults to `http://localhost:3000/api` if omitted).
- `VITE_SUPABASE_*_CATEGORY_ID` - optional: if you use specific Supabase category IDs for default categories, provide them here. The app expects system categories: Income, Miscellaneous, and Fixed Expenses (recently added server-side).

Important: update these env variables to match the seeded category IDs from your Supabase DB. Restart the dev server after changes.

## Default Categories (note)

Backend now seeds three system default categories with `user_id = NULL`:

- Income
- Miscellaneous
- Fixed Expenses

If you rely on built-in IDs in the frontend, copy the inserted `id` values into `VITE_SUPABASE_*` variables.

## Example integration snippets

Axios is configured in `src/main.jsx`:

```javascript
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";
axios.defaults.withCredentials = true;
```

Theme + direction usage in `main.jsx`:

- `selectThemeMode` and `selectDirection` from the settings slice drive `getTheme(themeMode, direction)` and the `CacheProvider` value.

## UI notes for developers

- Currency menu button is shown only when auth state indicates a logged-in user.
- All visible money values should use the `symbol` from `selectCurrency()` selector (settings slice).
- Use `useTranslation()` for all user-facing text; avoid hard-coded strings.
- When changing direction (language), the emotion cache is swapped; ensure no direct DOM manipulations depend on LTR layout.

## Testing the Application (quick)

1. Start backend: `cd ../backend && npm start`
2. Start frontend: `cd frontend && npm run dev`
3. Sign up / log in
4. Toggle theme, change language, change currency - verify persistence across reloads
5. Create transactions and confirm currency symbol appears and translations apply

## Troubleshooting

- Styles broken after switching direction:
  - Ensure `CacheProvider` is receiving the correct cache in `main.jsx`.
  - Try a full page refresh after changing direction.
- Currency symbol not updating:
  - Verify `settings.currency` in Redux DevTools and `localStorage.currency`.
  - Confirm components use the settings selector for currency symbol.
- Translations missing:
  - Check `src/constants/i18n/translations.js` and that keys match calls to `translate(key)`.

## Production

- Build the frontend:
  ```bash
  npm run build
  ```
- Preview:
  ```bash
  npm run preview
  ```
- Before building for production, ensure `VITE_API_URL` points to your production backend and `VITE_SUPABASE_*` vars reflect production category IDs (if required).

## Contributing

- Add translations to `src/constants/i18n/translations.js`.
- Use `settingsSlice` to add any global UI toggles that should persist.
- Ensure new UI components use `useTranslation()` and read currency from the settings slice.

For backend-related docs and the SQL seed (including the new `Fixed Expenses` category), see `../backend/README.md`. If you want, I can provide a short example of how to add translated keys to the translations file or show how to conditionally render the currency button in the header.
