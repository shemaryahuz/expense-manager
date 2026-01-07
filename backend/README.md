# Expense Manager API (Backend)

Express.js REST API server that provides authentication and CRUD operations for users, categories, and transactions. The service now uses **Supabase (PostgreSQL)** for persistence.

## Tech Stack

- **Node.js 18+** with ES modules
- **Express 5** - Web framework
- **jsonwebtoken** - JWT token generation and verification
- **bcrypt** - Password hashing (10 rounds)
- **cookie-parser** - HTTP-only cookie management
- **cors** - Cross-origin resource sharing
- **Supabase (PostgreSQL)** - Managed database

## Prerequisites

- Node.js 18 or newer
- npm 9+
- Supabase project (PostgreSQL)
- `.env` file in the `backend/` directory with:
  ```env
  JWT_SECRET=your-strong-random-secret-key-here
  PORT=3000
  CLIENT_URL=http://localhost:5173
  SUPABASE_URL=your-supabase-project-url
  SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
  ```
  - `SUPABASE_SERVICE_ROLE_KEY` is required for server-side operations; keep it secret.

## Installation

```bash
cd backend
npm install
```

## Running the Server

```bash
npm start
```

This runs `node --watch --env-file=.env server.js`, which:
- Watches for file changes and automatically restarts
- Loads environment variables from `.env`
- Starts the server on port 3000 (or the port specified in `.env`)
- Connects to Supabase using the supplied credentials

The server will be available at `http://localhost:3000` with the API under `/api`.

## Supabase Setup (one-time)

1. Create a Supabase project (PostgreSQL).
2. In the Supabase SQL editor, run:
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
3. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `backend/.env`.

## Project Structure

```
backend/
├── src/
│   ├── config/              # Supabase client setup
│   ├── dal/                 # Data access layer (Supabase queries)
│   ├── controllers/         # Business logic layer
│   │   ├── authController.js      # Signup, login, logout
│   │   ├── usersController.js     # User CRUD operations
│   │   ├── categoriesController.js # Category management
│   │   └── transactionsController.js # Transaction operations
│   │
│   ├── middlewares/         # Request middleware
│   │   └── authMiddleware.js      # JWT verification
│   │
│   └── routes/              # Express route definitions
│       ├── authRouter.js          # /api/auth routes
│       ├── usersRouter.js         # /api/users routes
│       ├── categoriesRouter.js   # /api/categories routes
│       └── transactionsRouter.js  # /api/transactions routes
│
├── server.js                # Application entry point
├── package.json
└── .env                     # Environment variables (create this)
```

## Request Lifecycle

1. **Request arrives** at `server.js`
2. **Middleware applied**:
   - CORS (allows `CLIENT_URL`, default `http://localhost:5173`)
   - Cookie parser (extracts `token` cookie)
   - JSON body parser
3. **Route matching**: Request is routed to appropriate router (`/api/auth`, `/api/users`, etc.)
4. **Authentication check**: Protected routes use `authMiddleware` to:
   - Extract `token` from cookies
   - Verify JWT signature using `JWT_SECRET`
   - Decode payload and inject `req.userId`
5. **Controller execution**: Business logic uses Supabase via the DAL
6. **Response sent**: JSON response with appropriate status code

## API Reference

All endpoints are prefixed with `/api`. Base URL: `http://localhost:3000/api`

### Authentication Endpoints (`/api/auth`)

These endpoints do not require authentication.

#### `POST /signup`
Create a new user account.

**Request Body:**
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
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "You are signed up successfully"
}
```

**Errors:**
- `400` - Missing required fields
- `409` - Email already exists
- `500` - Server error

**Notes:**
- Password is hashed with bcrypt (10 rounds)
- JWT token is set as HTTP-only cookie (expires in 1 hour)
- User ID is generated using `Date.now().toString()`

#### `POST /login`
Authenticate an existing user.

**Request Body:**
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
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "You are logged in successfully"
}
```

**Errors:**
- `400` - Missing email or password
- `401` - Invalid credentials
- `500` - Server error

**Notes:**
- JWT token is set as HTTP-only cookie (expires in 1 hour)
- Password hash is never returned in response

#### `POST /logout`
Clear the authentication cookie.

**Response (200):**
```json
{
  "message": "You are logged out successfully"
}
```

### User Endpoints (`/api/users`)

All user endpoints require authentication (valid JWT cookie).

#### `GET /`
Get all registered users.

**Response (200):**
```json
[
  {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "passwordHash": "..."
  }
]
```

**Errors:**
- `401` - Unauthorized (no valid token)
- `404` - No users found
- `500` - Server error

#### `GET /me`
Get the currently authenticated user.

**Response (200):**
```json
{
  "user": {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Errors:**
- `401` - Unauthorized
- `404` - User not found
- `500` - Server error

**Notes:**
- Password hash is excluded from response

#### `DELETE /me`
Delete the currently authenticated user account.

**Response (200):**
```json
{
  "message": "User deleted successfully"
}
```

**Errors:**
- `401` - Unauthorized
- `404` - User not found
- `500` - Server error

#### `PUT /me`
Update the currently authenticated user's profile (name and email).

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "updated-email@example.com"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "1234567890",
    "name": "Updated Name",
    "email": "updated-email@example.com"
  },
  "message": "User updated successfully"
}
```

**Errors:**
- `400` - Missing name or email
- `401` - Unauthorized
- `404` - User not found
- `409` - Email already exists
- `500` - Server error

#### `PUT /me/password`
Update the currently authenticated user's password.

**Request Body:**
```json
{
  "password": "newSecurePassword123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "Password updated successfully"
}
```

**Errors:**
- `400` - Missing password
- `401` - Unauthorized
- `404` - User not found
- `500` - Server error

### Category Endpoints (`/api/categories`)

All category endpoints require authentication.

#### `GET /`
Get all categories available to the authenticated user.

**Response (200):**
```json
[
  {
    "id": "c0",
    "name": "Income",
    "userId": null
  },
  {
    "id": "c1",
    "name": "Miscellaneous",
    "userId": null
  },
  {
    "id": "1234567890",
    "name": "Groceries",
    "userId": "1234567890"
  }
]
```

**Errors:**
- `401` - Unauthorized
- `404` - No categories found
- `500` - Server error

**Notes:**
- Returns user's custom categories plus default categories (`userId === null`)
- Default categories: "Income" (id: `c0`) and "Miscellaneous" (id: `c1`)

#### `POST /`
Create a new category for the authenticated user.

**Request Body:**
```json
{
  "name": "Entertainment"
}
```

**Response (200):**
```json
{
  "category": {
    "id": "1234567890",
    "name": "Entertainment",
    "userId": "1234567890"
  },
  "message": "Category added successfully"
}
```

**Errors:**
- `400` - Missing category name
- `401` - Unauthorized
- `500` - Server error

#### `PUT /:id`
Update a category's name.

**Request Body:**
```json
{
  "name": "Updated Category Name"
}
```

**Response (200):**
```json
{
  "category": {
    "id": "1234567890",
    "name": "Updated Category Name",
    "userId": "1234567890"
  },
  "message": "Category updated successfully"
}
```

**Errors:**
- `400` - Missing category name
- `401` - Unauthorized
- `404` - Category not found
- `500` - Server error

#### `DELETE /:id`
Delete a user-owned category.

**Response (200):**
```json
{
  "id": "1234567890",
  "message": "Category deleted successfully"
}
```

**Errors:**
- `400` - Cannot delete default categories
- `401` - Unauthorized
- `404` - Category not found
- `500` - Server error

**Notes:**
- Default categories (`userId === null`) cannot be deleted
- Transactions referencing the deleted category are automatically reassigned to "Miscellaneous" (id: `c1`)

### Transaction Endpoints (`/api/transactions`)

All transaction endpoints require authentication.

#### `GET /`
Get all transactions for the authenticated user, sorted by date (newest first).

**Response (200):**
```json
[
  {
    "id": "1234567890",
    "userId": "1234567890",
    "categoryId": "c1",
    "title": "Coffee",
    "type": "expense",
    "amount": 5.50,
    "date": "2024-01-15T10:30:00.000Z"
  }
]
```

**Errors:**
- `401` - Unauthorized
- `500` - Server error

#### `GET /month/:year/:month`
Get transactions for a specific calendar month.

**Parameters:**
- `year` - Four-digit year (e.g., `2024`)
- `month` - Month number (1-12)

**Example:** `GET /api/transactions/month/2024/1`

**Response (200):** Same format as `GET /`

**Errors:**
- `401` - Unauthorized
- `500` - Server error

#### `GET /search?title=<term>`
Search transactions by title (case-insensitive).

**Query Parameters:**
- `title` - Search term

**Example:** `GET /api/transactions/search?title=coffee`

**Response (200):** Same format as `GET /`

**Errors:**
- `401` - Unauthorized
- `500` - Server error

#### `POST /`
Create a new transaction.

**Request Body:**
```json
{
  "categoryId": "c1",
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
    "id": "1234567890",
    "userId": "1234567890",
    "categoryId": "c1",
    "title": "Grocery Shopping",
    "type": "expense",
    "amount": 125.75,
    "date": "2024-01-15T10:30:00.000Z"
  },
  "message": "Transaction added successfully"
}
```

**Errors:**
- `400` - Missing required fields
- `401` - Unauthorized
- `500` - Server error

**Notes:**
- Transaction ID is generated using `Date.now().toString()`
- `type` should be either `"income"` or `"expense"`
- `date` should be an ISO 8601 string

#### `PUT /:id`
Update an existing transaction.

**Request Body:**
```json
{
  "categoryId": "c1",
  "title": "Updated Title",
  "type": "expense",
  "amount": 150.00,
  "date": "2024-01-15T10:30:00.000Z"
}
```

**Response (200):**
```json
{
  "transaction": {
    "id": "1234567890",
    "userId": "1234567890",
    "categoryId": "c1",
    "title": "Updated Title",
    "type": "expense",
    "amount": 150.00,
    "date": "2024-01-15T10:30:00.000Z"
  },
  "message": "Transaction updated successfully"
}
```

**Errors:**
- `400` - Missing required fields
- `401` - Unauthorized
- `500` - Server error

#### `DELETE /:id`
Delete a transaction.

**Response (200):**
```json
{
  "id": "1234567890",
  "message": "Transaction deleted successfully"
}
```

**Errors:**
- `401` - Unauthorized
- `404` - Transaction not found
- `500` - Server error

## Data Models (Supabase Tables)

### User (`users`)
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "password_hash": "string",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Category (`categories`)
```json
{
  "id": "uuid",
  "name": "string",
  "user_id": "uuid | null",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```
- `user_id: null` indicates a default system category (e.g., Income, Miscellaneous)

### Transaction (`transactions`)
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "category_id": "uuid",
  "title": "string",
  "type": "income" | "expense",
  "amount": "number",
  "date": "string (ISO 8601)",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

## Authentication

Authentication uses JWT (JSON Web Tokens) stored in HTTP-only cookies:

- **Token name**: `token`
- **Expiration**: 1 hour
- **Cookie settings**:
  - `httpOnly: true` - Prevents JavaScript access
  - `secure: false` - Set to `true` in production with HTTPS
  - `sameSite: "lax"` - CSRF protection
  - `maxAge: 3600000` - 1 hour in milliseconds

### Using the API with curl

```bash
# Sign up (cookie saved to cookie.txt)
curl -i -c cookie.txt -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"secret"}' \
  http://localhost:3000/api/auth/signup

# Fetch categories (using saved cookie)
curl -b cookie.txt http://localhost:3000/api/categories

# Logout
curl -b cookie.txt -X POST http://localhost:3000/api/auth/logout
```

## Data Storage

The application uses Supabase (PostgreSQL) tables:

- **`users`** - User accounts with hashed passwords
- **`categories`** - Transaction categories (includes defaults with `user_id: null`)
- **`transactions`** - All transaction records

### Default Categories

Ensure default categories exist in `categories` with `user_id: null`, including at minimum:
- Income
- Miscellaneous

## Error Handling

All errors follow a consistent format:

```json
{
  "message": "Error description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `404` - Not Found
- `409` - Conflict (e.g., email already exists)
- `500` - Internal Server Error

## CORS Configuration

CORS is configured to allow requests from `http://localhost:5173` (default Vite dev server):

```javascript
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
```

To change the allowed origin, update `server.js`.

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process or change PORT in .env
```

### JWT Verification Fails
- Ensure `JWT_SECRET` is set in `.env`
- Verify the secret hasn't changed between server restarts
- Check that cookies are being sent with requests (`withCredentials: true`)

### Supabase Connection Issues
- Verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env`
- Ensure the service role key has insert/update/delete permissions for your tables
- Confirm the Supabase project is reachable from your network

## Limitations & Production Considerations

⚠️ **This is a development/demo application. For production:**

1. **Database**: Supabase is used for persistence; harden roles, RLS, and backups for production
2. **Security**:
   - Use HTTPS
   - Enable `secure: true` for cookies
   - Implement rate limiting
   - Add input validation and sanitization
   - Use environment-specific secrets management
3. **Performance**:
   - Implement connection pooling
   - Add caching where appropriate
   - Use database indexes
4. **Reliability**:
   - Add database transactions
   - Implement proper error handling and logging
   - Set up monitoring and alerts
5. **Scalability**:
   - Use a reverse proxy (nginx)
   - Implement horizontal scaling
   - Consider microservices architecture

## Development Tips

- Use `node --watch` for automatic restarts during development
- Check server console for error messages
- Verify Supabase table data if results seem incorrect
- Test API endpoints with tools like Postman or curl
- Use Redux DevTools to inspect frontend state
