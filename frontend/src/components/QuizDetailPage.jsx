import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosClient } from "../api/axios";

export default function QuizDetailPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosClient.get(`/api/quizzes/${quizId}`)
      .then(res => {
        setQuiz(res.data);
        console.log(res.data)
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur lors de la récupération du quiz :", err);
        setError("Impossible de charger le quiz.");
        setLoading(false);
      });
  }, [quizId]);

  if (loading) return <div>Chargement...</div>;

  if (error) return <div className="error">{error}</div>;

  if (!quiz) return <div>Aucun quiz trouvé.</div>;

  return (
    <section className="quiz-detail">
      <div className="container">
        <h2>{quiz.titre}</h2>
        <p><strong>Langage :</strong> {quiz.langage}</p>
        <p><strong>Niveau :</strong> {quiz.niveau}</p>
        <p><strong>Temps limite :</strong> {quiz.tempsLimite} minutes</p>
        <hr />

        <h3>Questions ({quiz.questions.length})</h3>
        <ol>
          {quiz.questions.map((question, index) => (
            <li key={question.id} className="question-item">
              <p><strong>{question.enonce}</strong></p>
              <ul>
                {question.reponses.map((rep) => (
                  <li key={rep.id}>
                    {rep.texte}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <button onClick={() => navigate(-1)} style={{ marginTop: "20px" }}>
          Retour
        </button>
      </div>
    </section>
  );
}
