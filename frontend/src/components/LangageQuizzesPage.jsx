import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosClient } from "../api/axios";

export default function LangageQuizzesPage() {
  const { langageId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [langageInfo, setLangageInfo] = useState(null);

  // Map of language information
  const languagesMap = {
    html: {
      name: "HTML",
      icon: "🌐",
      description: "Maîtrisez la structure des pages web avec nos quiz HTML.",
      colorClass: "html",
    },
    css: {
      name: "CSS",
      icon: "🎨",
      description: "Testez vos connaissances en design et mise en page CSS.",
      colorClass: "css",
    },
    javascript: {
      name: "JavaScript",
      icon: "⚡",
      description: "Devenez expert en JavaScript, le langage du web interactif.",
      colorClass: "javascript",
    },
    python: {
      name: "Python",
      icon: "🐍",
      description: "Développez vos compétences en Python, un langage polyvalent.",
      colorClass: "python",
    },
    react: {
      name: "React",
      icon: "⚛️",
      description: "Devenez un expert des composants et du state management.",
      colorClass: "react",
    },
    php: {
      name: "PHP",
      icon: "🐘",
      description: "Maîtrisez le développement back-end avec nos quiz PHP.",
      colorClass: "php",
    },
  };

  useEffect(() => {
    // Set the current language info
    setLangageInfo(languagesMap[langageId]);

    // Fetch quizzes for this language
    const fetchQuizzes = async () => {
      try {
        const response = await axiosClient.get(`/quizzes/langage/${langageId}`);
        setQuizzes(response.data.quizzes);
      } catch (err) {
        setError(err.response?.data?.error || 'Erreur lors du chargement des questionnaires');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [langageId]);

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;

  return (
    <section className={`langage-quizzes-page ${langageInfo?.colorClass || ''}`}>
      <div className="container">
        <div className="header">
          <div className="langage-icon">
            <span>{langageInfo?.icon}</span>
          </div>
          <h1>Questionnaires {langageInfo?.name}</h1>
          <p>{langageInfo?.description}</p>
        </div>

        {quizzes.length === 0 ? (
          <div className="no-quizzes">
            <p>Aucun questionnaire disponible pour ce langage actuellement.</p>
            <Link to="/quiz" className="back-link">
              ← Retour aux langages
            </Link>
          </div>
        ) : (
          <div className="quizzes-grid">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="quiz-card">
                <h3>{quiz.titre}</h3>
                <div className="quiz-meta">
                  <span className="level">Niveau: {quiz.niveau}</span>
                  <span className="time">⏱️ {quiz.tempsLimite} min</span>
                  <span className="questions">{quiz.questions_count} questions</span>
                </div>
                <Link to={`/quiz/${quiz.id}`} className="start-button">
                  Commencer
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}