import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { getUser } from "./features/user/userThunks";

import { PUBLIC_PAGES, PRIVATE_PAGES } from "./constants/app/pages";

import Layout from "./components/layout/Layout";
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
          <Route element={<PublicRoute />}>
            {PUBLIC_PAGES.map(({ route, Element }) => (
              <Route key={route} path={route} element={<Element />} />
            ))}
          </Route>

          <Route element={<ProtectedRoute />}>
            {PRIVATE_PAGES.map(({ route, Element }) => (
              <Route key={route} path={route} element={<Element />} />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
