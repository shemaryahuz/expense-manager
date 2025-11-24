## Expense Manager

Monorepo that bundles a cookie-based Express API and a Vite + React client for tracking personal income and expenses. The backend persists mock data in JSON files and exposes JWT-protected CRUD APIs. The frontend consumes those APIs to deliver dashboards, category management, and transaction workflows.

### Repository Layout
- `backend/` – Express 5 server, JSON datastore, authentication and REST APIs.
- `frontend/` – React 19 application using Redux Toolkit, React Router, and Material UI.

### Prerequisites
- Node.js 18+ and npm (backend uses `node --watch`)
- Modern browser for the Vite dev server

### Quick Start
1. **Clone the repository**
   ```bash
   git clone https://github.com/shemaryahuz/expense-manager.git
   cd expense-manager
   ```
2. **Configure environment variables**
   - Inside `backend/.env` define `JWT_SECRET=<strong-random-string>`
   - (Optional) add `PORT=<number>` and update the frontend Axios base URL if you do not use `3000`
3. **Install dependencies**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
4. **Run the API server**
   ```bash
   cd backend
   npm start
   ```
   The server listens on `http://localhost:3000` with the REST API under `/api`.
5. **Run the frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   Vite serves the UI at `http://localhost:5173` and proxies requests to the backend configured in `src/main.jsx`.

### Additional Documentation
- Backend details, API reference, and data model live in [`backend/README.md`](backend/README.md).
- Frontend architecture, routing, and UI documentation live in [`frontend/README.md`](frontend/README.md).

Refer to those documents for troubleshooting tips, folder-by-folder breakdowns, and feature-specific instructions.

