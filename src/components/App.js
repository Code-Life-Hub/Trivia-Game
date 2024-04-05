import React, { useState, useEffect } from "react";
import "../styles/App.css";
import QuestionCard from "./QuestionCard";

function App({ difficulty }) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);

  // Function to fetch a question based on difficulty
  const fetchQuestion = async (newDifficulty) => {
    try {
      const response = await fetch(
        `/api/trivia_questions/difficulty/${newDifficulty || difficulty}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const questions = await response.json();
      // Randomly pick a question if multiple are returned
      const randomQuestionIndex = Math.floor(Math.random() * questions.length);
      const question = questions[randomQuestionIndex];

      // Map the question options to an array
      const answerOptions = [
        question.option_a,
        question.option_b,
        question.option_c,
        question.option_d,
      ];

      setCurrentQuestion({ ...question, answerOptions });
    } catch (error) {
      console.error("Could not fetch question: ", error);
    }
  };

  useEffect(() => {
    fetchQuestion(difficulty);
  }, [difficulty]);

  // Handle the submit answer event
  const handleSubmitAnswer = () => {
    if (selectedAnswer === currentQuestion?.correct_option) {
      // Reset attempts, fetch new question
      setAttempts(0);
      fetchQuestion();
    } else {
      // Increment attempt counter and show failure animation if needed
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      // If attempts are 2 or more, fetch new question
      if (newAttempts >= 2) {
        setAttempts(0);
        fetchQuestion();
      }
    }
  };

  // Ensure we have a current question to display
  if (!currentQuestion) return <div>Loading question...</div>;

  return (
    <QuestionCard
      question={currentQuestion.question_text}
      answerOptions={currentQuestion.answerOptions}
      selectedAnswer={selectedAnswer}
      onSelectAnswer={setSelectedAnswer}
      onSubmit={handleSubmitAnswer}
      attempts={attempts}
    />
  );
}

export default App;
