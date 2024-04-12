import React from "react";
import Lottie from "lottie-react";
import animationData from "./wellDoneAnim.json";
import "../styles/App.css";

const SuccessAnimation = ({ nextQuestion }) => {
  return (
    <div>
      <div className="nextButton">
        <button onClick={nextQuestion} className="next-question-button">
          Next Question
        </button>
      </div>
      <Lottie animationData={animationData} />
    </div>
  );
};

export default SuccessAnimation;
