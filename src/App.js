import { Routes, Route } from "react-router-dom";
import MapPage from "./MapPage";

function App() {
  return (
    <Routes>
      <Route path="/map" element={<MapPage />} />
    </Routes>
  );
}

export default App;
