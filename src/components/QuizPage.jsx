import { useState, useEffect } from "react"
import Trivia from "./Trivia"

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    let ignore = false;

    if (questions.length === 0) {
      fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
        .then((res) => res.json())
        .then((data) => {
          if (!ignore) {
            setQuestions(data.results);
          }
        });
    }

    return () => {
      ignore = true;
    };
  }, [questions]);

  function pickAnswerForQuestion(questionID, answerString) {
    setAnswers((prevValue) => {
      return { ...prevValue, [questionID]: answerString };
    });
  }

  function checkAnswers() {
    const correctAnswers = questions.map((question) => {
      return question.correct_answer;
    });

    const totalCorrectAnswers = correctAnswers.filter(
      (correctAnswer, index) => {
        return correctAnswer === answers[index];
      }
    );

    setScore(totalCorrectAnswers.length);
  }

  function tryAgain() {
    setQuestions([]);
    setScore(null);
    setAnswers({});
  }

  if (questions.length === 0) {
    return (
      <div className="loading-page container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="quiz-page container">
      {questions.map((question, questionID) => (
        <Trivia
          key={questionID}
          question={question.question}
          incorrectOptions={question.incorrect_answers}
          correctOption={question.correct_answer}
          pickedAnswer={answers[questionID]}
          pickAnswer={(answerString) =>
            pickAnswerForQuestion(questionID, answerString)
          }
          disabled={score !== null}
        />
      ))}
      <div className="quiz-result">
        {score !== null && (
          <p className="quiz-result-score">
            You scored {score}/{questions.length} correct answers
          </p>
        )}

        {score === null ? (
          <button
            disabled={questions.length !== Object.keys(answers).length}
            className="main-button"
            onClick={checkAnswers}
          >
            Check answers
          </button>
        ) : (
          <button className="main-button" onClick={tryAgain}>
            {score === questions.length ? "Play again" : "Try again"}
          </button>
        )}
      </div>
    </div>
  );
}