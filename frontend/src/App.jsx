import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { selectUserState } from "./features/user/userSlice";
import { getUser } from "./features/user/userThunks";

import Layout from "./components/layout/Layout";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

import { PUBLIC_PAGES, PRIVATE_PAGES } from "./constants/app/pages";
import { STATUSES } from "./constants/features/statusConstants";

const { IDLE } = STATUSES;

function App() {
  const dispatch = useDispatch();

  const { authStatus } = useSelector(selectUserState);

  useEffect(() => {
    if (authStatus === IDLE) {
      dispatch(getUser());
    }
  }, [dispatch, authStatus]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route element={<PublicRoute />}>
            {PUBLIC_PAGES.map(({ route, Element }) => (
              <Route key={route} path={route} element={<Element />} />
            ))}
          </Route>

          {/* protected routes */}
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
