import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Player from "../pages/Player";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:name" element={<Player />} />
      </Routes>
    </BrowserRouter>
  );
}