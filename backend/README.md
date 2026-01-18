# Expense Manager Backend

Express REST API server providing authentication and CRUD operations for expense tracking. Uses Supabase (PostgreSQL) for data persistence with JWT cookie-based authentication.

## Tech Stack

- **Node.js 18+** with ES modules
- **Express 5** - Web framework
- **Supabase** - PostgreSQL database
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing (10 rounds)
- **cookie-parser** - Cookie management
- **cors** - Cross-origin resource sharing

## Prerequisites

- Node.js 18+
- npm 9+
- Supabase project

## Installation

```bash
cd backend
npm install
```

## Configuration

Create `.env` file in the `backend/` directory:

```env
JWT_SECRET=your-strong-random-secret-key
PORT=3000
CLIENT_URL=http://localhost:5173
SUPABASE_URL=your-supabase-project-url
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

**Security Notes:**

- Generate `JWT_SECRET`: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Keep `SUPABASE_SERVICE_ROLE_KEY` private - it grants full database access

## Database Setup

Run this SQL in your Supabase SQL editor:

```sql
-- Users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Transactions table
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

-- Default system categories
INSERT INTO public.categories (name, user_id)
VALUES
  ('Income', NULL),
  ('Miscellaneous', NULL),
  ('Fixed Expenses', NULL)
ON CONFLICT DO NOTHING;
```

## Running the Server

```bash
npm start
```

Server starts on `http://localhost:3000` with API at `/api`.

**Development mode** uses `node --watch` for automatic restarts on file changes.

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── supabase.js              # Supabase client setup
│   │
│   ├── controllers/
│   │   ├── authController.js        # Signup, login, logout
│   │   ├── categoriesController.js  # Category operations
│   │   ├── transactionsController.js # Transaction operations
│   │   └── usersController.js       # User management
│   │
│   ├── dal/
│   │   ├── categoriesDAL.js         # Category database queries
│   │   ├── transactionsDAL.js       # Transaction database queries
│   │   └── usersDAL.js              # User database queries
│   │
│   ├── middlewares/
│   │   └── authMiddleware.js        # JWT verification
│   │
│   ├── routes/
│   │   ├── authRouter.js            # /api/auth routes
│   │   ├── categoriesRouter.js      # /api/categories routes
│   │   ├── transactionsRouter.js    # /api/transactions routes
│   │   └── usersRouter.js           # /api/users routes
│   │
│   └── utils/
│       └── caseConvertor.js         # Snake/camel case conversion
│
├── server.js                        # Application entry point
├── package.json
└── .env
```

## Architecture

### Request Flow

1. **Request** arrives at `server.js`
2. **Middleware** applied:
   - CORS (allows `CLIENT_URL`)
   - Cookie parser (extracts JWT token)
   - JSON body parser
3. **Routing** to appropriate router
4. **Authentication** (protected routes):
   - Extract token from cookies
   - Verify JWT signature
   - Inject `req.userId`
5. **Controller** executes business logic
6. **DAL** queries Supabase database
7. **Response** sent with status code

### Data Layer

- **Controllers** contain business logic
- **DAL** handles all database operations via Supabase client
- **Utils** provide helper functions (e.g., case conversion)

## API Reference

Base URL: `http://localhost:3000/api`

### Authentication (`/api/auth`)

#### POST `/auth/signup`

Create new user account.

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201):**

```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "You are signed up successfully"
}
```

**Errors:** `400` (validation), `409` (email exists), `500` (server error)

#### POST `/auth/login`

Authenticate user.

**Request:**

```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200):**

```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "You are logged in successfully"
}
```

**Errors:** `400` (validation), `401` (invalid credentials), `500`

#### POST `/auth/logout`

Clear authentication cookie.

**Response (200):**

```json
{
  "message": "You are logged out successfully"
}
```

### Users (`/api/users`)

_All endpoints require authentication_

#### GET `/users/me`

Get current user profile.

**Response (200):**

```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### PUT `/users/me`

Update profile (name and email).

**Request:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Response (200):**

```json
{
  "user": {
    "id": "uuid",
    "name": "Jane Doe",
    "email": "jane@example.com"
  },
  "message": "User updated successfully"
}
```

**Errors:** `400` (validation), `409` (email exists), `404`, `500`

#### PUT `/users/me/password`

Change password.

**Request:**

```json
{
  "password": "newSecurePassword123"
}
```

**Response (200):**

```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "Password updated successfully"
}
```

#### DELETE `/users/me`

Delete account.

**Response (200):**

```json
{
  "message": "User deleted successfully"
}
```

### Categories (`/api/categories`)

_All endpoints require authentication_

#### GET `/categories`

Get all available categories (user's custom + system defaults).

**Response (200):**

```json
[
  {
    "id": "uuid",
    "name": "Income",
    "userId": null
  },
  {
    "id": "uuid",
    "name": "Groceries",
    "userId": "user-uuid"
  }
]
```

**Notes:**

- System categories have `userId: null`
- Returns both user's categories and defaults

#### POST `/categories`

Create new category.

**Request:**

```json
{
  "name": "Entertainment"
}
```

**Response (200):**

```json
{
  "category": {
    "id": "uuid",
    "name": "Entertainment",
    "userId": "user-uuid"
  },
  "message": "Category added successfully"
}
```

#### PUT `/categories/:id`

Update category name.

**Request:**

```json
{
  "name": "Updated Name"
}
```

**Response (200):**

```json
{
  "category": {
    "id": "uuid",
    "name": "Updated Name",
    "userId": "user-uuid"
  },
  "message": "Category updated successfully"
}
```

#### DELETE `/categories/:id`

Delete user category.

**Response (200):**

```json
{
  "id": "uuid",
  "message": "Category deleted successfully"
}
```

**Notes:**

- Cannot delete system categories (`userId: null`)
- Transactions are reassigned to "Miscellaneous"

### Transactions (`/api/transactions`)

_All endpoints require authentication_

#### GET `/transactions`

Get all user transactions (sorted by date, newest first).

**Response (200):**

```json
[
  {
    "id": "uuid",
    "userId": "user-uuid",
    "categoryId": "category-uuid",
    "title": "Coffee",
    "type": "expense",
    "amount": 5.5,
    "date": "2024-01-15T10:30:00.000Z"
  }
]
```

#### GET `/transactions/month/:year/:month`

Get transactions for specific month.

**Example:** `GET /transactions/month/2024/1`

**Response:** Same as GET `/transactions`

#### GET `/transactions/search?title=term`

Search transactions by title (case-insensitive).

**Example:** `GET /transactions/search?title=coffee`

**Response:** Same as GET `/transactions`

#### POST `/transactions`

Create transaction.

**Request:**

```json
{
  "categoryId": "uuid",
  "title": "Grocery Shopping",
  "type": "expense",
  "amount": 125.75,
  "date": "2024-01-15T10:30:00.000Z"
}
```

**Response (200):**

```json
{
  "transaction": {
    "id": "uuid",
    "userId": "user-uuid",
    "categoryId": "uuid",
    "title": "Grocery Shopping",
    "type": "expense",
    "amount": 125.75,
    "date": "2024-01-15T10:30:00.000Z"
  },
  "message": "Transaction added successfully"
}
```

**Notes:**

- `type` must be `"income"` or `"expense"`
- `date` must be ISO 8601 string

#### PUT `/transactions/:id`

Update transaction.

**Request:** Same as POST

**Response (200):**

```json
{
  "transaction": { ... },
  "message": "Transaction updated successfully"
}
```

#### DELETE `/transactions/:id`

Delete transaction.

**Response (200):**

```json
{
  "id": "uuid",
  "message": "Transaction deleted successfully"
}
```

## Data Models

### User

```typescript
{
  id: UUID;
  name: string;
  email: string;
  password_hash: string;
  created_at: timestamp;
  updated_at: timestamp;
}
```

### Category

```typescript
{
  id: UUID;
  name: string;
  user_id: UUID | null; // null = system category
  created_at: timestamp;
  updated_at: timestamp;
}
```

### Transaction

```typescript
{
  id: UUID;
  user_id: UUID;
  category_id: UUID;
  title: string;
  type: "income" | "expense";
  amount: number;
  date: timestamp;
  created_at: timestamp;
  updated_at: timestamp;
}
```

## Authentication

JWT tokens stored in HTTP-only cookies:

- **Cookie name:** `token`
- **Expiration:** 1 hour
- **Settings:**
  - `httpOnly: true` - Prevents XSS
  - `secure: false` - Set `true` for HTTPS
  - `sameSite: "lax"` - CSRF protection
  - `maxAge: 3600000` - 1 hour

### Example with curl

```bash
# Signup
curl -c cookies.txt -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"secret"}' \
  http://localhost:3000/api/auth/signup

# Get profile
curl -b cookies.txt http://localhost:3000/api/users/me

# Logout
curl -b cookies.txt -X POST http://localhost:3000/api/auth/logout
```

## Error Handling

All errors return JSON:

```json
{
  "message": "Error description"
}
```

**Status codes:**

- `200` - Success
- `201` - Created
- `400` - Bad request (validation)
- `401` - Unauthorized
- `404` - Not found
- `409` - Conflict (duplicate email)
- `500` - Server error

## CORS Configuration

Configured to allow `CLIENT_URL` (default: `http://localhost:5173`):

```javascript
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);
```

## Production Considerations

⚠️ **For production deployment:**

1. **Security**
   - Enable HTTPS
   - Set `secure: true` for cookies
   - Implement rate limiting
   - Add input validation/sanitization
   - Use secrets manager for environment variables
   - Enable Supabase Row-Level Security (RLS)

2. **Performance**
   - Use connection pooling
   - Add caching layer
   - Create database indexes
   - Implement query optimization

3. **Reliability**
   - Add database transactions
   - Implement comprehensive logging
   - Set up error monitoring (e.g., Sentry)
   - Add health check endpoints

4. **Scalability**
   - Use reverse proxy (nginx)
   - Implement horizontal scaling
   - Consider load balancing

## Troubleshooting

### Port Already in Use

```bash
# Find process
lsof -i :3000          # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Change port in .env or kill process
```

### JWT Verification Fails

- Verify `JWT_SECRET` is set and unchanged
- Check cookies are sent with requests (`withCredentials: true`)
- Ensure token hasn't expired

### Supabase Connection Issues

- Verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- Check network connectivity to Supabase
- Confirm service role key has proper permissions

## Development Tips

- Use `node --watch` for automatic restarts
- Check console for detailed error messages
- Verify Supabase data in the Table Editor
- Test endpoints with Postman or curl
- Use environment variables for all configuration

## Support

For issues or questions, please refer to the [main documentation](../README.md) or open an issue on GitHub.
