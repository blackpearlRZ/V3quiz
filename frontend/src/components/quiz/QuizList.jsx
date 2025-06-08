import { useEffect, useState } from "react";
import QuizCard from "./QuizCard";
import { axiosClient } from "../../api/axios";

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
  const titre = quiz.titre || "";
  const description = quiz.description || "";

  const matchesSearch =
    titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    description.toLowerCase().includes(searchTerm.toLowerCase());

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
          getQuizzesForTab().map((quiz) => (
              <QuizCard 
                key={quiz.id} 
                {...quiz}
              />
            ))
                    ) : (
          <div className="no-results">Aucun quiz ne correspond à vos critères.</div>
        )}
      </div>
    </div>
    </>
  );
};

export default QuizList;
