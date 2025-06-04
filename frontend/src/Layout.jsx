import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import LanguageQuiz from "./components/LanguageQuiz";
import Quiz from "./components/Quiz";
import QuizResults from "./components/QuizResults";


export default function Layout() {
  return (
    <div className="app-container">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        
        {/* Protected quiz routes */}
          <Route path="/quiz/language/:language" element={<LanguageQuiz />} />
          <Route path="/quiz/:language/:quizId" element={<Quiz />} />
          <Route path="/quiz/:language/results" element={<QuizResults />} />
          {/*<Route path="/dashboard" element={<Dashboard />} />*/}

       
      </Routes>
    </div>
  );
}