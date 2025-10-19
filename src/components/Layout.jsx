import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <header>
        <img src="/make-money.svg" alt="make money icon" width={200} />
        <h1>Expense Manager</h1>
      </header>
      <Outlet />
      <footer>
        <p>
          &copy; 2025 by{" "}
          <a href="https://github.com/shemaryahuz">Shemaryahu Zalmanov</a>
        </p>
      </footer>
    </div>
  );
}
