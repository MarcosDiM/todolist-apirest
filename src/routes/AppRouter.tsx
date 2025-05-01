import { BacklogScreen } from "../components/screens/BacklogScreen/BacklogScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router"; // Importa Router
import { SprintListScreen } from "../components/screens/SprintListScreen/SprintListScreen";
import { SprintScreen } from "../components/screens/SprintScreen/SprintScreen";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BacklogScreen />} />
        <Route path="/sprints" element={<SprintListScreen />} />
        <Route path="/sprints/:id" element={<SprintScreen />} />
      </Routes>
    </Router>
  );
};
