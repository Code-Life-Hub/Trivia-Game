import React, { useState } from "react";
import App from "./App";
import "../styles/home.css";

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
      {startGame ? (
        <App difficulty={difficulty} />
      ) : (
        <div>
          <h1>Welcome to the Trivia App!</h1>
          <div className="difficultySelect">
            Select Difficulty:
            <select onChange={handleSelectDifficulty} value={difficulty}>
              <option value="">-- Select Difficulty --</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <button onClick={handleStartGame}>Start Game</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
