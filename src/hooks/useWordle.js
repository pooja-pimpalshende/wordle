import { useEffect, useState } from "react";
import { addNewGuess, formatGuess } from "../utils";

const useWordle = (solution) => {
  const [currentGuess, setCurrentGuess] = useState("");
  const [history, setHistory] = useState([]);
  const [guesses, setGuesses] = useState([...Array(5)]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [turn, setTurn] = useState(0);
  const [message, setMessage] = useState("");

  const handleKeyUp = ({ key }) => {
    if (key === "Enter") {
      if (turn > 4) {
        setMessage("You used all your guesses");
        return;
      }
      if (history.includes(currentGuess)) {
        setMessage("You already tried that word");
        return;
      }
      if (currentGuess.length !== 5) {
        setMessage("Word must be 5 characters long");
        return;
      }
      const formattedGuess = formatGuess(currentGuess, solution);
      addNewGuess(
        turn,
        formattedGuess,
        currentGuess,
        solution,
        setGuesses,
        setHistory,
        setTurn,
        setCurrentGuess,
        setIsCorrect
      );
      setMessage("");
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };
  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [currentGuess, history, turn, solution]);

  return {
    currentGuess,
    history,
    turn,
    guesses,
    isCorrect,
    message,
    handleKeyUp,
  };
};

export default useWordle;
