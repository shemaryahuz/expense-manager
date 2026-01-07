# Expense Manager

A full-stack expense tracking application built as a monorepo with a cookie-based Express API backend and a Vite + React frontend. The application allows users to track personal income and expenses, manage categories, and view financial dashboards.

## Repository Layout

- **`backend/`** – Express 5 server with Supabase (PostgreSQL), JWT authentication, and REST APIs
- **`frontend/`** – React 19 application using Redux Toolkit, React Router v7, and Material UI v7

## Features

- **User Authentication**: Secure signup/login with JWT tokens stored in HTTP-only cookies
- **Account Management**: View profile, update name/email, change password, and delete account
- **Transaction Management**: Create, read, update, and delete income and expense transactions
- **Category Management**: Custom categories with default system categories (Income, Miscellaneous)
- **Dashboard**: Monthly budget overview, top spending categories, and recent transactions
- **Search & Filter**: Search transactions by title and filter by month
- **Responsive UI**: Modern Material UI design with custom theming

## Tech Stack

### Backend
- Node.js 18+ with ES modules
- Express 5
- Supabase (PostgreSQL) for persistence
- JWT authentication (jsonwebtoken)
- Password hashing (bcrypt)
- Cookie-based sessions (cookie-parser)
- CORS enabled for frontend communication

### Frontend
- React 19 with StrictMode
- Vite 7 for build tooling
- Redux Toolkit for state management
- React Router v7 for routing
- Material UI v7 with Emotion styling
- Axios for API communication
- Day.js for date handling

## Prerequisites

- **Node.js 18+** and npm 9+
- Modern browser (Chrome, Firefox, Edge, Safari)
- Git (for cloning)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/shemaryahuz/expense-manager.git
cd expense-manager
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
JWT_SECRET=your-strong-random-secret-key-here
PORT=3000
CLIENT_URL=http://localhost:5173
SUPABASE_URL=your-supabase-project-url
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

**Important**:
- Replace `JWT_SECRET` with a long, random string (e.g., `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret; it is required for server-side Supabase access.

For the **frontend**, create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_INCOME_CATEGORY_ID=<your_income_category_id>
VITE_SUPABASE_MISC_CATEGORY_ID=<your_misc_category_id>
```

These variables control the API base URL and the IDs of the two default Supabase categories (`Income` and `Miscellaneous`) that the frontend treats as special.

### 3. Install Dependencies

Install backend dependencies:
```bash
cd backend
npm install
```

Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### 4. Run the Backend Server

From the `backend/` directory:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in `.env`). The API is available under `/api`.

### 5. Set Up Supabase (one-time)

1. Create a Supabase project (PostgreSQL).
2. Run the SQL below in the Supabase SQL editor to create tables and seed default categories:
   ```sql
   create table if not exists public.users (
     id uuid primary key default gen_random_uuid(),
     name text not null,
     email text not null unique,
     password_hash text not null,
     created_at timestamptz not null default now(),
     updated_at timestamptz not null default now()
   );

   create table if not exists public.categories (
     id uuid primary key default gen_random_uuid(),
     name text not null,
     user_id uuid references public.users(id) on delete cascade,
     created_at timestamptz not null default now(),
     updated_at timestamptz not null default now()
   );

   create table if not exists public.transactions (
     id uuid primary key default gen_random_uuid(),
     user_id uuid not null references public.users(id) on delete cascade,
     category_id uuid not null references public.categories(id) on delete set null,
     title text not null,
     type text not null check (type in ('income','expense')),
     amount numeric(12,2) not null,
     date timestamptz not null,
     created_at timestamptz not null default now(),
     updated_at timestamptz not null default now()
   );

   insert into public.categories (id, name, user_id)
   values
     (gen_random_uuid(), 'Income', null),
     (gen_random_uuid(), 'Miscellaneous', null)
   on conflict do nothing;
   ```
3. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `backend/.env` to the project credentials.

### 5. Run the Frontend Development Server

From the `frontend/` directory (in a new terminal):
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## Project Structure

```
expense-manager/
├── backend/
│   ├── src/
│   │   ├── config/         # Supabase client setup
│   │   ├── dal/            # Data access layer (Supabase queries)
│   │   ├── controllers/    # Business logic
│   │   ├── middlewares/    # Authentication middleware
│   │   ├── routes/         # Express route handlers
│   │   └── utils/          # Helpers (e.g., case conversion)
│   ├── server.js           # Application entry point
│   ├── package.json
│   └── .env                # Environment variables (create this)
│
├── frontend/
│   ├── src/
│   │   ├── app/            # Redux store configuration
│   │   ├── components/     # Reusable UI components
│   │   ├── features/       # Redux slices and thunks
│   │   ├── pages/          # Route-level page components
│   │   ├── routes/         # Route guards
│   │   ├── theme/          # Material UI theme
│   │   ├── constants/      # Application constants
│   │   └── utiles/         # Utility functions
│   ├── public/             # Static assets
│   ├── package.json
│   └── vite.config.js
│
└── README.md               # This file
```

## API Endpoints

All API endpoints are prefixed with `/api`. Authentication is required for most endpoints (except auth routes).

### Authentication (`/api/auth`)
- `POST /signup` - Create a new user account
- `POST /login` - Authenticate and receive JWT cookie
- `POST /logout` - Clear authentication cookie

### Users (`/api/users`)
- `GET /` - Get all users (requires auth)
- `GET /me` - Get current authenticated user
- `PUT /me` - Update current user's name and email
- `PUT /me/password` - Update current user's password
- `DELETE /me` - Delete current user account

### Categories (`/api/categories`)
- `GET /` - Get user's categories and default categories
- `POST /` - Create a new category
- `PUT /:id` - Update a category name
- `DELETE /:id` - Delete a user-owned category

### Transactions (`/api/transactions`)
- `GET /` - Get all user transactions (sorted by date)
- `GET /month/:year/:month` - Get transactions for a specific month
- `GET /search?title=<term>` - Search transactions by title
- `POST /` - Create a new transaction
- `PUT /:id` - Update a transaction
- `DELETE /:id` - Delete a transaction

For detailed API documentation, see [`backend/README.md`](backend/README.md).

## Frontend Routes

- `/` - Public home page with login/signup
- `/dashboard` - Protected dashboard with monthly overview
- `/transactions` - Protected transaction list and management
- `/categories` - Protected category management
- `/profile` - Protected account settings (profile, password, delete account)

For detailed frontend documentation, see [`frontend/README.md`](frontend/README.md).

## Development

### Backend Development
- The server uses `node --watch` for automatic restarts on file changes
- Data is stored in Supabase tables (`users`, `categories`, `transactions`)
- Default categories (Income, Miscellaneous) should exist in Supabase with `user_id: null`

### Frontend Development
- Vite provides hot module replacement (HMR) for instant updates
- Redux DevTools can be used for state inspection
- ESLint is configured for code quality

## Building for Production

### Backend
The backend runs directly with Node.js. For production:
- Use a process manager like PM2
- Set up environment variables securely (including Supabase keys)
- Consider using a reverse proxy (nginx) with HTTPS

### Frontend
Build the frontend for production:
```bash
cd frontend
npm run build
```

The production build will be in the `dist/` directory. Preview it with:
```bash
npm run preview
```

## Security Considerations

⚠️ **This is a development/demo application. For production use:**

- Use HTTPS in production
- Implement rate limiting
- Add input validation and sanitization
- Use a proper database instead of JSON files
- Implement token refresh mechanism
- Add CSRF protection
- Set up proper CORS policies
- Use environment-specific secrets management

## Troubleshooting

### Backend Issues
- **Port already in use**: Change `PORT` in `.env` or kill the process using port 3000
- **JWT errors**: Ensure `JWT_SECRET` is set in `.env`
- **Supabase errors**: Verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set correctly

### Frontend Issues
- **API connection errors**: Verify backend is running on `http://localhost:3000`
- **CORS errors**: Check that backend CORS is configured for your frontend URL
- **Build errors**: Clear `node_modules` and reinstall dependencies

### Common Issues
- **Cookie not persisting**: Ensure `withCredentials: true` is set in Axios (already configured)
- **Authentication fails**: Check that `JWT_SECRET` is consistent
- **Data not persisting**: Verify Supabase credentials and table access

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Additional Documentation

- **Backend API Reference**: See [`backend/README.md`](backend/README.md) for detailed API documentation, data models, and backend architecture
- **Frontend Guide**: See [`frontend/README.md`](frontend/README.md) for frontend architecture, component structure, and development guidelines
