import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import QuizDetailPage from "./components/quiz/QuizDetailPage";
import QuizList from "./components/quiz/QuizList";

export default function Layout() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/quiz" element={<QuizList />} />
        <Route path="/quiz/langage/:langage" element={<QuizDetailPage />} />
      </Routes>
    </div>
  );
}
