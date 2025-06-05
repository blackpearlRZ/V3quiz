import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosClient } from "../api/axios";

const languages = [
  {
    id: "html",
    name: "HTML",
    icon: "🌐",
    description: "Maîtrisez la structure des pages web avec nos quiz HTML.",
    colorClass: "html",
  },
  {
    id: "css",
    name: "CSS",
    icon: "🎨",
    description: "Testez vos connaissances en design et mise en page CSS.",
    colorClass: "css",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "⚡",
    description: "Devenez expert en JavaScript, le langage du web interactif.",
    colorClass: "javascript",
  },
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    description: "Développez vos compétences en Python, un langage polyvalent.",
    colorClass: "python",
  },
  {
    id: "react",
    name: "React",
    icon: "⚛️",
    description: "Devenez un expert des composants et du state management.",
    colorClass: "react",
  },
  {
    id: "php",
    name: "PHP",
    icon: "🐘",
    description: "Maîtrisez le développement back-end avec nos quiz PHP.",
    colorClass: "php",
  },
];

export default function LanguageQuizzesPage() {
  const { langageId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentLanguage = languages.find((lang) => lang.id === langageId);

  useEffect(() => {
    axiosClient.get('/api/quizzes')
      .then((res) => {
        const filtered = res.data.quizzes.filter(
          (quiz) => quiz.langage === langageId
        );
        console.log(res.data);
        setQuizzes(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des quizzes :", err);
        setLoading(false);
      });
  }, [langageId]);

  if (!currentLanguage) return <p>Langage non reconnu.</p>;

  if (loading) return <p>Chargement...</p>;

  return (
    <section className={`language-quizzes-page ${currentLanguage.colorClass}`}>
      <div className="container">
        <div className="header">
          <div className="langage-icon">{currentLanguage.icon}</div>
          <h1>Quiz {currentLanguage.name}</h1>
          <p>{currentLanguage.description}</p>
        </div>

        {quizzes.length === 0 ? (
          <p>Aucun quiz trouvé pour ce langage.</p>
        ) : (
          <div className="quizzes-grid">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="quiz-card">
                <h3>{quiz.titre}</h3>
                <p>Niveau: {quiz.niveau}</p>
                <p>Temps limite: {quiz.tempsLimite} min</p>
                <p>{quiz.questions_count ?? quiz.questions?.length ?? 0} questions</p>
                <Link to={`/quizzes/${quiz.id}`} className="start-button">Commencer</Link>
              </div>
            ))}
          </div>
        )}

        <Link to="/quiz" className="back-link">← Retour aux langages</Link>
      </div>
    </section>
  );
}
