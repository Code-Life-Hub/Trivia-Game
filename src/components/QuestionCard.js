import React from "react";
import "../styles/QuestionCard.css";

// QuestionCard component that displays the question and answer options
const QuestionCard = ({
  question,
  answerOptions,
  selectedAnswer,
  onSelectAnswer,
  onSubmit,
  attempts,
}) => {
  // Check if answerOptions is an array before mapping
  const optionsList = Array.isArray(answerOptions) ? (
    answerOptions.map((answer, index) => (
      <div className="answerButtons">
        <button
          key={index}
          onClick={() => onSelectAnswer(index)}
          className={selectedAnswer === answer ? "selected" : ""}
        >
          {answer}
        </button>
      </div>
    ))
  ) : (
    <p>No options available</p>
  );

  return (
    <div className="question-card">
      <div className="question-text">{question}</div>
      <div className="answer-options">{optionsList} </div>
      <button onClick={onSubmit} className="submitButton">
        Check Answer
      </button>
    </div>
  );
};

export default QuestionCard;
