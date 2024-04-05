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
  return (
    <div className="question-card">
      <div className="question-text">{question}</div>
      {Array.isArray(answerOptions) && ( // Check if answerOptions is an array
        <div className="answer-options">
          {answerOptions.map((answer, index) => (
            <button
              key={index}
              onClick={() => onSelectAnswer(answer)}
              className={selectedAnswer === answer ? "selected" : ""}
            >
              {answer}
            </button>
          ))}
        </div>
      )}
      <button onClick={onSubmit} className="submit-button">
        Submit Answer
      </button>
      {attempts >= 2 && (
        <div className="correct-answer">
          {/* Show correct answer and explanation, you will need to adjust how you show this */}
          <div>Correct Answer: {selectedAnswer}</div> {/* Adjust this line */}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
