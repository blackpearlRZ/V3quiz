import { Link } from "react-router-dom";

const getLevelColorClass = (level) => {
  switch (level) {
    case "débutant":
      return "badge green";
    case "intermédiaire":
      return "badge yellow";
    case "avancé":
      return "badge red";
    default:
      return "badge gray";
  }
};

export default function QuizCard({
  id,
  titre,
  description,
  langage,
  niveau,
  questions_count,
  tempsLimite
}) {
  return (
    <Link to={`/quiz/langage/${langage}`} className="quiz-card-link">
      <div className="quiz-card">
        <div className="quiz-card-content">
          <div className="badges">
            <span className="badge soft">{langage}</span>
            <span className={getLevelColorClass(niveau)}>{niveau}</span>
          </div>
          <h3 className="quiz-title">{titre}</h3>
          <p className="quiz-description">{description}</p>
        </div>
        <div className="quiz-card-footer">
          <span>{questions_count} questions</span>
          <span>~{tempsLimite} min</span>
        </div>
      </div>
    </Link>
  );
}
