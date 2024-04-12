import React from "react";
import Lottie from "lottie-react";
import animationData from "./Oops.json";
import "../styles/App.css";

const TryAgain = () => {
  return (
    <div className="tryAgain">
      <Lottie animationData={animationData} />
    </div>
  );
};

export default TryAgain;
