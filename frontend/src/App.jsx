import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/he";

import { getUser } from "./features/user/userThunks";
import { selectLanguage } from "./features/settings/settingsSlice";

import { PUBLIC_PAGES, PRIVATE_PAGES } from "./constants/app/pages";

import Layout from "./components/layout/Layout";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  const language = useSelector(selectLanguage);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    dayjs.locale(language);
  }, [language]);

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
