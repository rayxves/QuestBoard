import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Dashboard from "./Components/Dashboard/Dashboard";
import QuestionsPage from "./Components/QuestionsPage/QuestionsPage";
import FinishPage from "./Components/Finish/FinishPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/question-page" element={<QuestionsPage />} />
        <Route path="/finish" element={<FinishPage />} />
      </Routes>
    </Router>
  );
}

export default App;
