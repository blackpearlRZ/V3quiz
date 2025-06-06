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
  title,
  description,
  language,
  level,
  questionCount,
  duration,
  slug,
}) {
  return (
    <Link to={`/quiz/${slug}`} className="quiz-card-link">
      <div className="quiz-card">
        <div className="quiz-card-content">
          <div className="badges">
            <span className="badge soft">{language}</span>
            <span className={getLevelColorClass(level)}>{level}</span>
          </div>
          <h3 className="quiz-title">{title}</h3>
          <p className="quiz-description">{description}</p>
        </div>
        <div className="quiz-card-footer">
          <span>{questionCount} questions</span>
          <span>~{duration} min</span>
        </div>
      </div>
    </Link>
  );
}
