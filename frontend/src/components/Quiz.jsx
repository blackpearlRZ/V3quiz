import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Quiz() {
  const { language, quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
     
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        // Fetch quiz details
        const quizResponse = await axios.get(`/api/quizzes/${quizId}`);
        setQuiz(quizResponse.data);
        setTimeLeft(quizResponse.data.tempsLimite * 60); // Convert minutes to seconds

        // Fetch questions for this quiz
        const questionsResponse = await axios.get(`/api/questions?quiz_id=${quizId}`);
        setQuestions(questionsResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelect = (answerId, isCorrect) => {
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = { answerId, isCorrect };
      return newAnswers;
    });

    if (isCorrect) {
      setScore((prev) => prev + questions[currentQuestionIndex].points);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitQuizResults();
    }
  };

  const submitQuizResults = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const successRate = (score / questions.reduce((acc, q) => acc + q.points, 0)) * 100;
      const averageTime = quiz.tempsLimite * 60 - timeLeft;

      await axios.post("/api/statistiques", {
        utilisateur_id: userId,
        langage: language,
        reussiteMoyenne: successRate,
        tempsMoyen: averageTime,
      });

      navigate(`/quiz/${language}/results`, {
        state: { score, total: questions.length, timeSpent: averageTime },
      });
    } catch (err) {
      console.error("Error submitting results:", err);
    }
  };

  if (loading) return <div>Loading quiz...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!quiz || questions.length === 0) return <div>No quiz data found</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{quiz.titre}</h2>
        <div className="quiz-info">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          <span>Score: {score}</span>
        </div>
      </div>

      <div className="question-container">
        <h3>{currentQuestion.enonce}</h3>
        
        {currentQuestion.type === 'multiple_choice' && (
          <MultipleChoiceQuestion 
            question={currentQuestion} 
            selectedAnswer={selectedAnswers[currentQuestionIndex]?.answerId}
            onAnswerSelect={handleAnswerSelect}
          />
        )}
        
        {currentQuestion.type === 'single_choice' && (
          <SingleChoiceQuestion 
            question={currentQuestion} 
            selectedAnswer={selectedAnswers[currentQuestionIndex]?.answerId}
            onAnswerSelect={handleAnswerSelect}
          />
        )}
        
        {/* Add other question type components as needed */}
      </div>

      <button onClick={handleNextQuestion} className="next-question-btn">
        {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
      </button>
    </div>
  );
}

function MultipleChoiceQuestion({ question, selectedAnswer, onAnswerSelect }) {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`/api/reponses?question_id=${question.id}`);
        setAnswers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching answers:", err);
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [question.id]);

  if (loading) return <div>Loading answers...</div>;

  return (
    <div className="answers-container">
      {answers.map((answer) => (
        <div key={answer.id} className="answer-option">
          <input
            type="checkbox"
            id={`answer-${answer.id}`}
            checked={selectedAnswer === answer.id}
            onChange={() => onAnswerSelect(answer.id, answer.estCorrecte)}
          />
          <label htmlFor={`answer-${answer.id}`}>{answer.texte}</label>
        </div>
      ))}
    </div>
  );
}

function SingleChoiceQuestion({ question, selectedAnswer, onAnswerSelect }) {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`/api/reponses?question_id=${question.id}`);
        setAnswers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching answers:", err);
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [question.id]);

  if (loading) return <div>Loading answers...</div>;

  return (
    <div className="answers-container">
      {answers.map((answer) => (
        <div key={answer.id} className="answer-option">
          <input
            type="radio"
            id={`answer-${answer.id}`}
            name="quiz-answer"
            checked={selectedAnswer === answer.id}
            onChange={() => onAnswerSelect(answer.id, answer.estCorrecte)}
          />
          <label htmlFor={`answer-${answer.id}`}>{answer.texte}</label>
        </div>
      ))}
    </div>
  );
}