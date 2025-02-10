export const formatGuess = (currentGuess, solution) => {
  const solutionArray = [...solution];
  const initialGuess = [...currentGuess].map((letter) => ({
    key: letter,
    color: "black",
  }));

  const firstGuess = initialGuess.map((letter, i) => {
    if (solutionArray[i] === letter.key) {
      solutionArray[i] = null;
      return { ...letter, color: "green" };
    }
    return letter;
  });

  const secondGuess = firstGuess.map((letter) => {
    if (letter.color === "black" && solutionArray.includes(letter.key)) {
      solutionArray[solutionArray.indexOf(letter.key)] = null;
      return { ...letter, color: "yellow" };
    }
    return letter;
  });

  return secondGuess;
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
