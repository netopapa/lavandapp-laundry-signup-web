import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./containers/Home";

export const AppRoutes = () => (
  <HashRouter>
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  </HashRouter>
);
