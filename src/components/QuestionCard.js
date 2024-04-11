import React from "react";
import "../styles/QuestionCard.css";

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
      <button
        key={index}
        onClick={() => onSelectAnswer(index)}
        className={selectedAnswer === answer ? "selected" : ""}
      >
        {answer}
      </button>
    ))
  ) : (
    <p>No options available</p>
  );

  return (
    <div className="question-card">
      <div className="question-text">{question}</div>
      <div className="answer-options">{optionsList}</div>
      <button onClick={onSubmit} className="submit-button">
        Submit Answer
      </button>
    </div>
  );
};

export default QuestionCard;
