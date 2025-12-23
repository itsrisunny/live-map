import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import MapPage from "../pages/MapPage";

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/map" element={<MapPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
