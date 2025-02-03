import { useEffect, useState } from "react";
import useWordle from "../../hooks/useWordle";
import Grid from "../Grid/Grid";

const Wordle = ({ solution }) => {
  const { currentGuess, turn, guesses, isCorrect, message } =
    useWordle(solution);

  const [endMessage, setEndMessage] = useState("");

  useEffect(() => {
    if (isCorrect) {
      setEndMessage("🎉 You Win!");
    } else if (turn > 4) {
      setEndMessage(`😢 Game Over! The correct word is : ${solution}`);
    }
  }, [isCorrect, turn]);

  return (
    <>
      <Grid
        currentGuess={currentGuess}
        guesses={guesses}
        turn={turn}
        message={endMessage}
      />
      {message && <div className="message">{message}</div>}
    </>
  );
};

export default Wordle;
