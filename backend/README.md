# Expense Manager API (Backend)

Express.js server that provides authentication plus CRUD APIs for users, categories, and transactions. The service persists data in JSON files to keep the stack lightweight for demos and local development.

## Tech Stack
- Node.js 18+, ES modules
- Express 5 with cookie sessions (HTTP-only JWT)
- `jsonwebtoken`, `bcrypt`, `cookie-parser`, `cors`
- File-based storage under `database/`

## Prerequisites
- Node.js 18 or newer
- npm 9+
- `.env` file inside `backend/` with at least:
  ```
  JWT_SECRET=replace-with-a-long-random-string
  ```
  (Optional) add `PORT` and update `frontend/src/main.jsx` if you change the default backend port.

## Install & Run
```bash
cd backend
npm install
npm start          # runs node --watch --env-file=.env server.js
```

The server listens on `http://localhost:3000` and exposes the REST API under `/api`.

## Project Structure
```
backend/
  database/              # JSON files that act as a datastore
    users.json
    categories.json
    transactions.json
  src/
    controllers/         # Business logic per resource
    middlewares/         # JWT verification, etc.
    routes/              # Express routers grouped by feature
  server.js              # App bootstrap and router wiring
```

## Request Lifecycle
1. Client requests hit `server.js`, which applies `cors`, cookie parsing, and JSON parsing.
2. Routes under `/api/*` apply the `authMiddleware` when required. It verifies the `token` cookie using `JWT_SECRET` and injects `req.userId`.
3. Controllers perform synchronous file reads/writes against `database/*.json`.
4. JSON responses are returned; errors include a `{ message }` payload with an HTTP status code.

## API Reference
All routes are relative to `http://localhost:3000/api`. Unless specified, they require a valid `token` cookie that you obtain by calling the auth endpoints. Example requests assume `curl` with `-c cookie.txt -b cookie.txt` to persist cookies.

### Auth (`/auth`)
- `POST /signup`
  - Body: `{ "name": string, "email": string, "password": string }`
  - Creates a user (server hashes the password, generates `id`) and sets a JWT cookie valid for 1 hour.
- `POST /login`
  - Body: `{ "email": string, "password": string }`
  - Verifies credentials, returns the sanitized user, and sets the JWT cookie.
- `POST /logout`
  - Clears the `token` cookie.

### Users (`/users`)
- `GET /`
  - Returns all registered users (requires auth). Responds with 404 if no users exist.
- `GET /me`
  - Returns the currently authenticated user without the password hash.
- `DELETE /me`
  - Removes the authenticated user from `users.json`.

> **Note:** Update and password-reset helpers exist in `usersController.js` but are not currently wired via routes.

### Categories (`/categories`)
- `GET /`
  - Lists categories owned by the authenticated user plus shared defaults (`userId === null`).
- `POST /`
  - Body: `{ "name": string }`
  - Creates a category tied to the authenticated user.
- `PUT /:id`
  - Body: `{ "name": string }`
  - Renames an existing category.
- `DELETE /:id`
  - Deletes a user-owned category. Transactions referencing it fall back to the `Miscellaneous` default (`c1`). Default categories (`userId === null`) cannot be deleted and return `400`.

### Transactions (`/transactions`)
- `GET /`
  - Returns the authenticated user’s transactions, sorted descending by date.
- `GET /month/:year/:month`
  - Filters by calendar month (month is `1-12`).
- `GET /search?title=<term>`
  - Case-insensitive search on the `title` field.
- `POST /`
  - Body: `{ "categoryId", "title", "type", "amount", "date" }`
  - Creates a new transaction whose `id` is generated on the server.
- `PUT /:id`
  - Replaces a transaction payload with the provided body.
- `DELETE /:id`
  - Removes the transaction.

### Example Session
```bash
# Sign up (stores cookie in cookie.txt)
curl -i -c cookie.txt -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"secret"}' \
  http://localhost:3000/api/auth/signup

# Fetch categories with the same cookie
curl -b cookie.txt http://localhost:3000/api/categories
```

## Data Storage
The JSON files inside `database/` act as a persistent store. They must be writable by Node.js. The server reads/writes the entire file on each request, so avoid concurrent edits. Default categories live in `categories.json` with `userId: null` and should not be removed manually.

## Troubleshooting & Limitations
- JWT tokens last 1 hour and are not refreshable.
- There is no rate limiting or HTTPS enforcement; run this behind a reverse proxy for production use.
- Because storage is file-based, concurrent writes can introduce race conditions—regenerate data if files become corrupted.
- CORS is limited to `http://localhost:5173`. Update `server.js` if you host the frontend elsewhere.
