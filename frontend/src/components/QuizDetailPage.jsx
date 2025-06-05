import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosClient } from "../api/axios";

export default function QuizDetailPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosClient.get(`/api/quizzes/${id}`) // Adapt to your actual route
      .then((res) => {
        setQuiz(res.data);
        setLoading(false);
        console.log(res.data)
      })
      .catch((err) => {
        console.error("Erreur :", err);
        setError("Impossible de charger le quiz");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Chargement du quiz...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="quiz-detail-page">
      <div className="container">
        <h1>{quiz.titre}</h1>
        <p>Niveau: {quiz.niveau}</p>
        <p>Temps limite: {quiz.tempsLimite} minutes</p>
        <p>Nombre de questions: {quiz.questions?.length}</p>

        {/* Start Quiz Button or Render Questions */}
        <button onClick={() => alert("Démarrage du quiz...")}>Démarrer</button>

        {/* Optionally display questions */}
        <ul>
          {quiz.questions?.map((q, index) => (
            <li key={q.id}>
              <strong>Q{index + 1}:</strong> {q.question}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
