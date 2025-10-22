import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import CreditCards from "./pages/CreditCards";
import Budgets from "./pages/Budgets";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/credit-cards" element={<CreditCards />} />
          <Route path="/budgets" element={<Budgets />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
