// Home.js
import React, { useState } from "react";
import App from "./App"; // Import App component

const Home = () => {
  const [startGame, setStartGame] = useState(false);
  const [difficulty, setDifficulty] = useState("");

  const handleSelectDifficulty = (event) => {
    setDifficulty(event.target.value);
  };

  const handleStartGame = () => {
    if (difficulty) setStartGame(true);
  };

  if (startGame) {
    return <App difficulty={difficulty} />;
  }

  return (
    <div className="home-container">
      <h1>Welcome to the Trivia App!</h1>
      <div>
        Select Difficulty:
        <select onChange={handleSelectDifficulty} value={difficulty}>
          <option value="">-- Select Difficulty --</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button onClick={handleStartGame}>Start Game</button>
      </div>
    </div>
  );
};

export default Home;
