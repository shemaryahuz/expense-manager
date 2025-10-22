import { AppBar, Toolbar } from "@mui/material";

export default function Header() {
  return (
    <AppBar component="header" position="static">
      <Toolbar>
        <img
          src="/money-management.svg"
          alt="money management icon"
          width={50}
        />
        <h1>Expense Manager</h1>
      </Toolbar>
    </AppBar>
  );
}
