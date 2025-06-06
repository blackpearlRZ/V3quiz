import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";

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
        {quizzes.length === 0 ? (
          <p>Aucun quiz trouvé pour ce langage.</p>
        ) : (
          <div className="quizzes-grid">
            {quizzes.map((quiz) => (
                       <QuizCard
        key={quiz.id}
        id={quiz.id}
        title={quiz.title}
        description={quiz.description}
        language={quiz.language}
        level={quiz.level}
        questionCount={quiz.questionCount}
        duration={quiz.duration}
      />
            ))}
          </div>
        )}
    </section>
  );
}
