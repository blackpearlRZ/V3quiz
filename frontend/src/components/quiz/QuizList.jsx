import { useEffect, useState } from "react";
import QuizCard from "./QuizCard";
import { axiosClient } from "../../api/axios";
// Mock data
/*const quizzes = [
  {
    id: "1",
    titre: "Les bases du HTML5",
    description: "Testez vos connaissances sur les fondamentaux du HTML5",
    langage: "HTML",
    niveau: "débutant",
    questions: 20,
  
  },
  {
    id: "2",
    titre: "CSS Flexbox & Grid",
    description: "Maîtrisez-vous les layouts modernes en CSS ?",
    langage: "CSS",
    niveau: "intermédiaire",
    questions_count: 15,
    duration: 12,
    slug: "css-flexbox-grid",
  },
  {
    id: "3",
    titre: "JavaScript - Concepts avancés",
    description: "Les closures, promesses et le paradigme fonctionnel",
    langage: "JavaScript",
    niveau: "avancé",
    questions_count: 25,
    duration: 30,
    slug: "js-avance",
  },
  {
    id: "4",
    titre: "Python pour débutants",
    description: "Les bases de la syntaxe Python et les structures de données",
    langage: "Python",
    niveau: "débutant",
    questions_count: 20,
    duration: 15,
    slug: "python-debutants",
  },
  {
    id: "5",
    titre: "React - Les fondamentaux",
    description: "Components, props, state et le cycle de vie",
    langage: "React",
    niveau: "intermédiaire",
    questions_count: 18,
    duration: 20,
    slug: "react-fondamentaux",
  },
  {
    id: "6",
    titre: "PHP & MySQL",
    description: "Interactions entre PHP et les bases de données",
    langage: "PHP",
    niveau: "intermédiaire",
    questions_count: 22,
    duration: 25,
    slug: "php-mysql",
  },
];*/

const niveaus = ["débutant", "intermédiaire", "avancé"];
const langages = ["html", "css", "javascript", "python", "react", "php"];

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedniveau, setSelectedniveau] = useState();
  const [selectedlangage, setSelectedlangage] = useState();

  useEffect(() => {
    axiosClient.get('/api/quizzes')
    .then(response => {
      setQuizzes(response.data.quizzes);
      console.log(response.data)})
    .catch(err => {
      console.log('error fetching quizzes', err)
    })
  },[])

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch = quiz.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesniveau = selectedniveau ? quiz.niveau === selectedniveau : true;
    const matcheslangage = selectedlangage ? quiz.langage === selectedlangage : true;
    return matchesSearch && matchesniveau && matcheslangage;
  });

  const clearFilters = () => {
    setSelectedniveau();
    setSelectedlangage();
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
            value={selectedlangage || ""}
            onChange={(e) => setSelectedlangage(e.target.value || undefined)}
            className="filter-select"
          >
            <option value="">Langage</option>
            {langages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>

          <select
            value={selectedniveau || ""}
            onChange={(e) => setSelectedniveau(e.target.value || undefined)}
            className="filter-select"
          >
            <option value="">Niveau</option>
            {niveaus.map((niveau) => (
              <option key={niveau} value={niveau}>{niveau.charAt(0).toUpperCase() + niveau.slice(1)}</option>
            ))}
          </select>

          {(selectedniveau || selectedlangage || searchTerm) && (
            <button className="clear-button" onClick={clearFilters}>Effacer filtres</button>
          )}
        </div>
      </div>

      <div className="quiz-grid">
        {getQuizzesForTab().length > 0 ? (
          getQuizzesForTab().map((quiz) => <QuizCard key={quiz.id} {...quiz} />)
        ) : (
          <div className="no-results">Aucun quiz ne correspond à vos critères.</div>
        )}
      </div>
    </div>
    </>
  );
};

export default QuizList;
