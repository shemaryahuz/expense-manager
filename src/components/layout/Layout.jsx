import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <header>
        <img src="/money-management.svg" alt="money management icon" width={200} />
        <h1>Expense Manager</h1>
      </header>
        <Outlet /> {/* page content goes here per route */}
      <footer>
        <p>
          &copy; 2025 by <a href="https://github.com/shemaryahuz">Shemaryahu Zalmanov</a>
        </p>
      </footer>
    </div>
  )
}
