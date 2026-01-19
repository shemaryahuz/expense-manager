# Expense Manager

A full-stack expense tracking application with cookie-based authentication, built as a monorepo. Track personal income and expenses, manage categories, and view financial dashboards with multi-language and currency support.

## Features

- **User Authentication** - Secure signup/login with JWT tokens in HTTP-only cookies
- **Account Management** - Profile updates, password changes, and account deletion
- **Transaction Management** - Create, edit, delete, and search income/expense transactions
- **Category Management** - Custom categories plus system defaults (Income, Miscellaneous, Fixed Expenses)
- **Dashboard** - Monthly budget overview, top spending categories, and recent transactions
- **Search & Filter** - Search by title and filter by month
- **Multi-language Support** - English and Hebrew (עברית) with RTL layout
- **Multi-currency** - USD ($) and ILS (₪) with symbol display
- **Theme Toggle** - Light and dark modes
- **Responsive Design** - Mobile-friendly Material UI interface

## Tech Stack

### Backend

- Node.js 18+ with ES modules
- Express 5
- Supabase (PostgreSQL)
- JWT authentication with bcrypt password hashing
- Cookie-based sessions

### Frontend

- React 19 with Vite 7
- Redux Toolkit for state management
- React Router v7 with route guards
- Material UI v7 with Emotion styling
- RTL support with emotion cache
- Axios for API requests
- Day.js for date handling

## Prerequisites

- Node.js 18+ and npm 9+
- Supabase account and project
- Modern web browser

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/shemaryahuz/expense-manager.git
cd expense-manager
```

### 2. Set Up Supabase

Create a Supabase project and run this SQL in the SQL editor:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  amount NUMERIC(12, 2) NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert default system categories
INSERT INTO public.categories (name, user_id)
VALUES
  ('Income', NULL),
  ('Miscellaneous', NULL),
  ('Fixed Expenses', NULL)
ON CONFLICT DO NOTHING;
```

### 3. Configure Backend

Create `backend/.env`:

```env
JWT_SECRET=your-strong-random-secret-key
PORT=3000
CLIENT_URL=http://localhost:5173
SUPABASE_URL=your-supabase-project-url
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

Generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Install dependencies and start:

```bash
cd backend
npm install
npm start
```

### 4. Configure Frontend

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

Install dependencies and start:

```bash
cd ../frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

## Project Structure

```
expense-manager/
├── backend/
│   ├── src/
│   │   ├── __tests__/      # Test files
│   │   ├── config/         # Supabase client configuration
│   │   ├── controllers/    # Business logic
│   │   ├── dal/            # Data access layer
│   │   ├── middlewares/    # Authentication middleware
│   │   ├── routes/         # Express routes
│   │   └── utils/          # Helper functions
│   ├── jest.config.js      # Jest configuration
│   ├── server.js           # Entry point
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/            # Axios configuration
│   │   ├── app/            # Redux store
│   │   ├── components/     # Reusable components
│   │   │   └── common/
│   │   │       └── __tests__/  # Component tests
│   │   ├── constants/      # App constants
│   │   ├── features/       # Redux slices and thunks
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── providers/      # Context providers
│   │   ├── routes/         # Route guards
│   │   ├── test/           # Test configuration
│   │   ├── theme/          # MUI theme and RTL cache
│   │   └── utils/          # Utility functions
│   │       └── __tests__/  # Utility tests
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   └── .env
│
├── LICENSE
└── README.md
```

## API Endpoints

All endpoints are prefixed with `/api`.

### Authentication

- `POST /auth/signup` - Create account
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout

### Users

- `GET /users/me` - Get current user
- `PUT /users/me` - Update profile
- `PUT /users/me/password` - Change password
- `DELETE /users/me` - Delete account

### Categories

- `GET /categories` - Get all categories
- `POST /categories` - Create category
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### Transactions

- `GET /transactions` - Get all transactions
- `GET /transactions/month/:year/:month` - Get by month
- `GET /transactions/search?title=term` - Search
- `POST /transactions` - Create transaction
- `PUT /transactions/:id` - Update transaction
- `DELETE /transactions/:id` - Delete transaction

## Testing

### Backend Tests

```bash
cd backend
npm test                # Run tests once
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage report
```

### Frontend Tests

```bash
cd frontend
npm test                # Run tests once
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage report
```

## Deployment

### Live Application

- **Frontend**: [https://expense-manager-phi-self.vercel.app](https://expense-manager-phi-self.vercel.app)
- **Backend API**: [https://expense-manager-hzlq.onrender.com](https://expense-manager-hzlq.onrender.com)

### Deploy Your Own Instance

#### Backend (Render)

1. Fork this repository
2. Sign up at [render.com](https://render.com)
3. Create new Web Service
4. Connect your repository, select `backend` directory
5. Set environment variables (see `.env.production` template)
6. Deploy

#### Frontend (Vercel)

1. Sign up at [vercel.com](https://vercel.com)
2. Import your repository
3. Set root directory to `frontend`
4. Add `VITE_API_URL` environment variable
5. Deploy

See detailed deployment guide in [DEPLOYMENT.md](DEPLOYMENT.md)

## Building for Production

### Backend

```bash
cd backend
npm install --production
npm start
```

### Frontend

```bash
cd frontend
npm run build
```

The build output will be in `frontend/dist/`.

## Security Considerations

This is a development application. For production:

- Enable HTTPS and set `secure: true` for cookies
- Implement rate limiting
- Add input validation and sanitization
- Set up CSRF protection
- Configure proper CORS policies
- Use environment-specific secrets
- Enable Supabase Row-Level Security (RLS)
- Implement token refresh mechanism

## Development

### Backend

- Uses `node --watch` for auto-restart on file changes
- Default categories (Income, Miscellaneous, Fixed Expenses) have `user_id: NULL`

### Frontend

- Vite HMR for instant updates
- Redux DevTools for state inspection
- ESLint configured for code quality

## Documentation

- [Backend Documentation](backend/README.md) - API reference and backend architecture
- [Frontend Documentation](frontend/README.md) - Component structure and state management

## Troubleshooting

### Backend

- **Port in use**: Change `PORT` in `.env` or kill process on port 3000
- **JWT errors**: Verify `JWT_SECRET` is set
- **Supabase errors**: Check `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

### Frontend

- **API errors**: Ensure backend is running on `http://localhost:3000`
- **CORS errors**: Verify backend CORS allows your frontend URL
- **RTL issues**: Check emotion cache is correctly set for direction
- **Currency not updating**: Verify settings in Redux state and localStorage

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues or questions, please open an issue on GitHub.
[Live Application](https://expense-manager-phi-self.vercel.app/)
