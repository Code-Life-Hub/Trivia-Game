import React from "react";

const SuccessAnimation = ({ nextQuestion }) => {
  return (
    <div>
      <p>Well Done! Move on to the next question!</p>
      <button onClick={nextQuestion} className="next-question-button">
        Next Question
      </button>
      <dotlottie-player
        src="https://lottie.host/embed/70ee4b2a-46d5-4459-9e80-151c5f21640a/YkVl08Z2PF.json"
        background="transparent"
        speed="1"
        style={{ width: "300px", height: "300px" }} // Correct style prop syntax
        loop
        autoplay
      ></dotlottie-player>
    </div>
  );
};

export default SuccessAnimation;
