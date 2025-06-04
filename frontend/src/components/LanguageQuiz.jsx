import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function LanguageQuiz() {
  const { language } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`/api/quizzes?langage=${language}`);
        setQuizzes(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [language]);

  if (loading) return <div>Loading quizzes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="language-quiz-container">
      <h1>{language.toUpperCase()} Quizzes</h1>
      <div className="quizzes-grid">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} language={language} />
        ))}
      </div>
    </div>
  );
}

function QuizCard({ quiz, language }) {
  return (
    <div className="quiz-card">
      <h3>{quiz.titre}</h3>
      <p>Level: {quiz.niveau}</p>
      <p>Time limit: {quiz.tempsLimite} minutes</p>
      <Link to={`/quiz/${language}/${quiz.id}`} className="start-quiz-btn">
        Start Quiz
      </Link>
    </div>
  );
}