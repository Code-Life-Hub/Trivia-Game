import React, { useState, useEffect, useRef } from "react";
import "../styles/App.css";
import QuestionCard from "./QuestionCard";
import SuccessAnimation from "./SuccessAnimation";
import TryAgain from "./FailureAnimation";
import "../styles/QuestionCard.css";


function App({ difficulty }) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fetchedRef = useRef(false);
  const timeoutRef = useRef();
  // console.log(difficulty);

  const handleSelectAnswer = (index) => {

    let answer;
    switch (index) {
      case 0:
        answer = "A";
        break;
      case 1:
        answer = "B";
        break;
      case 2:
        answer = "C";
        break;
      case 3:
        answer = "D";
        break;
      default:
        answer = "";
        
    }
    setSelectedAnswer(answer);
    console.log("Selected answer is now:", answer);
  };

  const fetchQuestion = async () => {
    if (fetchedRef.current) {
      console.log("Fetch prevented, already fetched.");
      return;
    }

    console.log(`Starting fetch for difficulty: ${difficulty}`);
    setIsLoading(true);
    fetchedRef.current = true;

    try {
      const response = await fetch(
        `/api/trivia_questions/difficulty/${difficulty}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const questions = await response.json();
      const randomQuestionIndex = Math.floor(Math.random() * questions.length);
      const question = questions[randomQuestionIndex];

      const answerOptions = [
        question.option_a,
        question.option_b,
        question.option_c,
        question.option_d,
      ];

      setCurrentQuestion({ ...question, answerOptions });
      console.log("Fetched question:", question);
      console.log(
        "Correct option for fetched question:",
        question.correct_option
      );
    } catch (error) {
      console.error("Could not fetch question: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    console.log("App component mounted");
    fetchQuestion();
    // Cleanup function to clear timeout when component unmounts
    return () => {
      console.log("App component unmounted");
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      abortController.abort();
    };
  }, [difficulty]);

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) {
      alert("Please select an answer before submitting!");
      return;
    }

    console.log(
      `Comparing selected answer: ${selectedAnswer} with correct answer: ${currentQuestion?.correct_option}`
    );

    // Ensure currentQuestion is not null and selectedAnswer is correctly compared
    const isAnswerCorrect =
      currentQuestion && selectedAnswer === currentQuestion.correct_option;

    if (isAnswerCorrect) {
      setShowSuccess(true);
      // Clear previous timeout if it exists
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Assigning timeout to the ref so it can be cleared on cleanup
      timeoutRef.current = setTimeout(() => {
        fetchedRef.current = false;
      }, 20000); // Adjust to match the duration of success animation
    } else {
      // Incorrect answer logic remains the same
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 2) {
        setCurrentQuestion((prev) => ({ ...prev, showExplanation: true }));
      }
    }
  };

  const nextQuestion = () => {
    const abortController = new AbortController();
    setAttempts(0);
    setShowSuccess(false);
    setCurrentQuestion(null);
    setSelectedAnswer("");
    fetchedRef.current = false;
    // added abort controller
    fetchQuestion();
    return () => {
      abortController.abort();
    };
  };

  if (showSuccess) {
    return <SuccessAnimation nextQuestion={nextQuestion} />;
  }

  if (!currentQuestion || isLoading) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="App">

      <header className="App-header">
        {currentQuestion?.showExplanation ? (
          <>
            <p className="limitReached">
              You've reached the attempt limit, let's review and move on.
            </p>
            <p className="explanationText">
              Answer: {currentQuestion.explanation}
            </p>
            <button className="next-question-button" onClick={nextQuestion}>
              Next Question
            </button>
          </>
        ) : (
          <>
            <QuestionCard
              question={currentQuestion.question_text}
              answerOptions={currentQuestion.answerOptions}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={handleSelectAnswer}
              onSubmit={handleSubmitAnswer}
              attempts={attempts}
            />
            {attempts === 1 && <TryAgain />}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
