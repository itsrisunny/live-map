import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import MapPage from "../pages/MapPage";

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/map" element={<MapPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
