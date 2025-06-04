import { useLocation, Link } from "react-router-dom";

export default function QuizResults() {
  const location = useLocation();
  const { score, total, timeSpent } = location.state || {};

  if (!location.state) {
    return (
      <div className="results-container">
        <h2>No results to display</h2>
        <Link to="/" className="back-to-home">
          Return to Home
        </Link>
      </div>
    );
  }

  const percentage = Math.round((score / total) * 100);
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  return (
    <div className="results-container">
      <h2>Quiz Completed!</h2>
      <div className="results-stats">
        <p>Your score: {score} out of {total}</p>
        <p>Percentage: {percentage}%</p>
        <p>Time spent: {minutes}m {seconds}s</p>
      </div>
      <Link to="/" className="back-to-home">
        Return to Home
      </Link>
    </div>
  );
}