import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Player from "../pages/Player";
import Teams from "../pages/Teams";
import TeamsPlayers from "../pages/TeamsPlayers";
import TournamentDetails from "../pages/TournamentDetails";
import Tournaments from "../pages/Tournaments";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/tournaments/:tournamentId" element={<TournamentDetails />} />
        <Route
          path="/tournaments/:tournamentId/seasons/:seasonId/teams/:teamId/players"
          element={<TeamsPlayers />}
        />
        <Route
          path="/tournaments/:tournamentId/seasons/:seasonId/teams/:teamId/players/:playerId"
          element={<Player />}
        />
        <Route path="/teams" element={<Teams />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}