import React, { useState } from "react";
import App from "./App";
import "../styles/home.css";
import Header from "./Header";
import animationData from "./Thinking.json";
import Lottie from "lottie-react";

const Home = () => {
  const [startGame, setStartGame] = useState(false);
  const [difficulty, setDifficulty] = useState("");

  const handleSelectDifficulty = (event) => {
    setDifficulty(event.target.value);
  };

  const handleStartGame = () => {
    if (difficulty) {
      setStartGame(true);
    }
  };

  return (
    <div>
      <Header />

      {startGame ? (
        <App difficulty={difficulty} />
      ) : (
        <div className="homeContainer">
          <h1 className="homeHeader">Are you ready for Trivia?!</h1>
          <div className="difficultySelect">
            <br></br>
            <br></br>

            <select
              className="selectDropBox"
              onChange={handleSelectDifficulty}
              value={difficulty}
            >
              <option value="">-- Select Difficulty --</option>
              <option className="easyOption" value="Easy">
                Easy
              </option>
              <option className="mediumOption" value="Medium">
                Medium
              </option>
              <option className="hardOption" value="Hard">
                Hard
              </option>
            </select>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <button className="startButton" onClick={handleStartGame}>
            Start Game
          </button>
        </div>
      )}
      <footer>
        <Lottie animationData={animationData} />
      </footer>
    </div>
  );
};

export default Home;
