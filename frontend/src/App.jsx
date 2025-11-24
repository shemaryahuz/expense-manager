import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { getUser } from "./features/user/userThunks";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/home/HomePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import TransactionsPage from "./pages/transactions/TransactionsPage";
import CategoriesPage from "./pages/categories/CategoriesPage";

import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          {/* protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="categories" element={<CategoriesPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
