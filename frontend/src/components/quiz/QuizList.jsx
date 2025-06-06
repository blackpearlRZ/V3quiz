import { useState } from "react";
import QuizCard from "./QuizCard";

// Mock data
const quizzes = [
  {
    id: "1",
    title: "Les bases du HTML5",
    description: "Testez vos connaissances sur les fondamentaux du HTML5",
    language: "HTML",
    level: "débutant",
    questionCount: 20,
    duration: 15,
    slug: "bases-html5",
  },
  {
    id: "2",
    title: "CSS Flexbox & Grid",
    description: "Maîtrisez-vous les layouts modernes en CSS ?",
    language: "CSS",
    level: "intermédiaire",
    questionCount: 15,
    duration: 12,
    slug: "css-flexbox-grid",
  },
  {
    id: "3",
    title: "JavaScript - Concepts avancés",
    description: "Les closures, promesses et le paradigme fonctionnel",
    language: "JavaScript",
    level: "avancé",
    questionCount: 25,
    duration: 30,
    slug: "js-avance",
  },
  {
    id: "4",
    title: "Python pour débutants",
    description: "Les bases de la syntaxe Python et les structures de données",
    language: "Python",
    level: "débutant",
    questionCount: 20,
    duration: 15,
    slug: "python-debutants",
  },
  {
    id: "5",
    title: "React - Les fondamentaux",
    description: "Components, props, state et le cycle de vie",
    language: "React",
    level: "intermédiaire",
    questionCount: 18,
    duration: 20,
    slug: "react-fondamentaux",
  },
  {
    id: "6",
    title: "PHP & MySQL",
    description: "Interactions entre PHP et les bases de données",
    language: "PHP",
    level: "intermédiaire",
    questionCount: 22,
    duration: 25,
    slug: "php-mysql",
  },
];

const levels = ["débutant", "intermédiaire", "avancé"];
const languages = ["HTML", "CSS", "JavaScript", "Python", "React", "PHP"];

const QuizList = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState();

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel ? quiz.level === selectedLevel : true;
    const matchesLanguage = selectedLanguage ? quiz.language === selectedLanguage : true;
    return matchesSearch && matchesLevel && matchesLanguage;
  });

  const clearFilters = () => {
    setSelectedLevel();
    setSelectedLanguage();
    setSearchTerm("");
  };

  const getQuizzesForTab = () => {
    if (activeTab === "popular") {
      return filteredQuizzes.slice(0, 3);
    } else if (activeTab === "new") {
      return filteredQuizzes.slice(3, 6);
    }
    return filteredQuizzes;
  };

  return (
    <>
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>Choisissez votre défi</h1>
        <p>
          Explorez notre collection de quiz pour tester vos connaissances dans différents langages informatiques.
        </p>
      </div>

      <div className="quiz-controls">
        <div className="quiz-tabs">
          <button className={activeTab === "all" ? "tab active" : "tab"} onClick={() => setActiveTab("all")}>
            Tous les quiz
          </button>
          <button className={activeTab === "popular" ? "tab active" : "tab"} onClick={() => setActiveTab("popular")}>
            Populaires
          </button>
          <button className={activeTab === "new" ? "tab active" : "tab"} onClick={() => setActiveTab("new")}>
            Nouveautés
          </button>
        </div>

        <div className="quiz-filters">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input"
          />

          <select
            value={selectedLanguage || ""}
            onChange={(e) => setSelectedLanguage(e.target.value || undefined)}
            className="filter-select"
          >
            <option value="">Langage</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>

          <select
            value={selectedLevel || ""}
            onChange={(e) => setSelectedLevel(e.target.value || undefined)}
            className="filter-select"
          >
            <option value="">Niveau</option>
            {levels.map((level) => (
              <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
            ))}
          </select>

          {(selectedLevel || selectedLanguage || searchTerm) && (
            <button className="clear-button" onClick={clearFilters}>Effacer filtres</button>
          )}
        </div>
      </div>

      <div className="quiz-grid">
        {getQuizzesForTab().length > 0 ? (
          getQuizzesForTab().map((quiz) => <QuizCard key={quiz.id} {...quiz} />)
      //     <QuizCard
      //   key={quiz.id}
      //   id={quiz.id}
      //   title={quiz.title}
      //   description={quiz.description}
      //   language={quiz.language}
      //   level={quiz.level}
      //   questionCount={quiz.questionCount}
      //   duration={quiz.duration}
      //   slug={quiz.slug}
      // />
        ) : (
          <div className="no-results">Aucun quiz ne correspond à vos critères.</div>
        )}
      </div>
    </div>
    </>
  );
};

export default QuizList;
