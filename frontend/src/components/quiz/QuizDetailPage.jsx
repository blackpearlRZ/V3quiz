import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosClient } from "../../api/axios";
import { getCurrentUser } from "../service/AuthService"; // or your auth method

export default function QuizDetailPage() {
  const { langage } = useParams();
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

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

  useEffect(() => {
    if (quizzes.length > 0) {
      const quiz = quizzes[0];
      if (quiz?.tempsLimite) {
        const initialTime = quiz.tempsLimite * 60; // convert minutes to seconds
        setTimeLeft(initialTime);
      }
    }
  }, [quizzes]);

  useEffect(() => {
    if (submitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); // auto-submit when time is up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const handleSelect = (questionId, reponseId) => {
    setSelectedAnswers((prev) => {
      const current = prev[questionId] || [];
      return {
        ...prev,
        [questionId]: current.includes(reponseId)
          ? current.filter((id) => id !== reponseId)
          : [...current, reponseId],
      };
    });
  };

  const calculateScore = () => {
    let total = 0;
    const quiz = quizzes[0];

    quiz.questions.forEach((question) => {
      const correctIds = question.reponses
        .filter((r) => r.estCorrecte)
        .map((r) => r.id);

      const selectedIds = selectedAnswers[question.id] || [];

      const allCorrectSelected =
        correctIds.every((id) => selectedIds.includes(id)) &&
        selectedIds.every((id) => correctIds.includes(id));

      if (allCorrectSelected) {
        total += question.points * 0.1; // 10% of the question's points
      }
    });

    setScore(total);
    localStorage.setItem("quiz_score", total);
  };

  const handleSubmit = async () => {
  calculateScore();
  setSubmitted(true);

  try {
    const user = await getCurrentUser();
    const quiz = quizzes[0];

    if (user && user.id && quiz) {
      const totalPoints = quiz.questions.reduce((total, q) => total + q.points, 0);
      const reussiteMoyenne = totalPoints > 0 ? (score / totalPoints) * 100 : 0;
      const tempsMoyen = quiz.tempsLimite ? 
        (quiz.tempsLimite * 60) / quiz.questions.length : 0;

      // Calculate correct answers count
      let correctAnswersCount = 0;
      quiz.questions.forEach((question) => {
        const correctIds = question.reponses
          .filter((r) => r.estCorrecte)
          .map((r) => r.id);
        const selectedIds = selectedAnswers[question.id] || [];
        
        const allCorrectSelected =
          correctIds.every((id) => selectedIds.includes(id)) &&
          selectedIds.every((id) => correctIds.includes(id));
        
        if (allCorrectSelected) {
          correctAnswersCount++;
        }
      });

      // Calculate total time taken (time limit minus remaining time)
      const initialTime = quiz.tempsLimite * 60;
      const timeTaken = initialTime - timeLeft;

      const statsData = {
        utilisateur_id: user.id,
        quiz_id: quiz.id,
        langage: quiz.langage,
        reussiteMoyenne: parseFloat(reussiteMoyenne.toFixed(2)), // Ensure it's a number
        tempsMoyen: Math.round(tempsMoyen),
        total_questions: quiz.questions.length,
        questions_correctes: correctAnswersCount,
        temps_total: timeTaken
      };

      console.log('Sending statistics:', statsData); // Debug log

      const response = await axiosClient.post('/api/statistiques', statsData);
      console.log('Statistics saved:', response.data);
    }
  } catch (error) {
    console.error("Error saving statistics:", error);
    if (error.response) {
      console.error("Server response:", error.response.data);
    }
  }
};

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

  const quiz = quizzes[0];

  return (
    <section className="quiz-detail">
      <div className="quiz-detailcontainer">
        <h1 className="quiz-detail-title">{quiz.titre}</h1>

        <div className="quiz-meta">
          <div className="meta-item">
            <span className="meta-label">Langage:</span>
            <span className="meta-value">{quiz.langage}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Niveau:</span>
            <span className="meta-value">{quiz.niveau}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Temps limite:</span>
            <span className="meta-value">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")} minutes</span>
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
                <h3 className="question-text">
                  {question.enonce} ({question.points} pts)
                </h3>
                {question.reponses?.length > 0 && (
                  <ul className="answers-list">
                    {question.reponses.map((rep) => {
                      const isChecked =
                        selectedAnswers[question.id]?.includes(rep.id) || false;

                      return (
                        <li
                          key={rep.id}
                          className={`answer-item ${
                            submitted && rep.estCorrecte ? "Correste" : ""
                          }`}
                        >
                          <label>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() =>
                                !submitted && handleSelect(question.id, rep.id)
                              }
                              disabled={submitted}
                            />
                            {rep.texte}
                            {submitted && (
                              <span
                                className={`answer-badge ${
                                  rep.estCorrecte ? "correct" : "incorrect"
                                }`}
                              >
                                {rep.estCorrecte ? " (Correct)" : " (Faux)"}
                              </span>
                            )}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </div>

        {submitted && (
          <div className="score-board">
            <h3>Your Score: {score.toFixed(2)} points</h3>
            <button
              className="btn btn-secondary"
              onClick={() => {
                localStorage.removeItem("quiz_score");
                setScore(0);
              }}
            >
              Reset Score
            </button>
          </div>
        )}

        <div className="quiz-actions">
          {!submitted && (
            <button className="btn btn-primary-1" onClick={handleSubmit}>
              resultats
            </button>
          )}
          <button
            className="btn btn-primary-1"
            onClick={() => navigate(-1)}
          >
            Back to List
          </button>
        </div>
      </div>
    </section>
  );
}