import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import LangageQuizzesPage from "./components/quiz/LangageQuizzesPage";
import QuizDetailPage from "./components/quiz/QuizDetailPage";
import QuizList from "./components/quiz/QuizList";
//import LanguageQuiz from "./components/LanguageQuiz";
//import Quiz from "./components/Quiz";
//import QuizResults from "./components/QuizResults";


export default function Layout() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/quiz" element={<QuizList />} />
        <Route path="/quiz/langage/:langageId" element={<LangageQuizzesPage />} />
        <Route path="/quizzes/:quizId" element={<QuizDetailPage />} />
      </Routes>
    </div>
  );
}