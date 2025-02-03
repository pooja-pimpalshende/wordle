export const formatGuess = (currentGuess, solution) => {
  let solutionArray = [...solution];
  let formattedGuess = [...currentGuess].map((letter) => {
    return { key: letter, color: "black" };
  });

  formattedGuess.forEach((letter, i) => {
    if (solutionArray[i] === letter.key) {
      formattedGuess[i].color = "green";
      solutionArray[i] = null;
    }
  });

  formattedGuess.forEach((letter, i) => {
    if (solutionArray.includes(letter.key) && letter.color !== "green") {
      formattedGuess[i].color = "yellow";
      solutionArray[solutionArray.indexOf(letter.key)] = null;
    }
  });

  return formattedGuess;
};

export const addNewGuess = (
  turn,
  formattedGuess,
  currentGuess,
  solution,
  setGuesses,
  setHistory,
  setTurn,
  setCurrentGuess,
  setIsCorrect
) => {
  setGuesses((prevGuesses) => {
    let newGuesses = [...prevGuesses];
    newGuesses[turn] = formattedGuess;
    return newGuesses;
  });

  setHistory((prevHistory) => [...prevHistory, currentGuess]);
  setTurn((prevTurn) => prevTurn + 1);
  setCurrentGuess("");
  setIsCorrect(currentGuess === solution);
};
