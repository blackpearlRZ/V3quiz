import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosClient } from "../../api/axios";

export default function QuizDetailPage() {
  const { langage } = useParams();
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/api/quizzes/langage/${langage}`);
        setQuizzes(response.data.quizzes);
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setError(err.response?.data?.error || "Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [langage]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Quiz Found</h3>
        <p>No quizzes available for {langage} language</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  // Assuming we show the first quiz for this language
  const quiz = quizzes[0];

  return (
    <section className="quiz-detail">
      <div className="container">
        <h1 className="quiz-title">{quiz.titre}</h1>
        
        <div className="quiz-meta">
          <div className="meta-item">
            <span className="meta-label">Language:</span>
            <span className="meta-value">{quiz.langage}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Level:</span>
            <span className="meta-value">{quiz.niveau}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Time Limit:</span>
            <span className="meta-value">{quiz.tempsLimite} minutes</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Questions:</span>
            <span className="meta-value">{quiz.questions_count}</span>
          </div>
        </div>

        <div className="quiz-questions">
          <h2>Questions</h2>
          <ol className="questions-list">
            {quiz.questions?.map((question) => (
              <li key={question.id} className="question-item">
                <h3 className="question-text">{question.enonce}</h3>
                {question.reponses?.length > 0 && (
                  <ul className="answers-list">
                    {question.reponses.map((rep) => (
                      <li 
                        key={rep.id} 
                        className={`answer-item ${rep.correcte ? 'correct-answer' : ''}`}
                      >
                        {rep.texte}
                        {rep.correcte && <span className="correct-badge">Correct</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="quiz-actions">
          <button 
            className="btn btn-primary"
            onClick={() => navigate(`/quiz/${quiz.id}/start`)}
          >
            Start Quiz
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Back to List
          </button>
        </div>
      </div>
    </section>
  );
}