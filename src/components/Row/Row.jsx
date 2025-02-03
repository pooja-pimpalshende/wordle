import styles from "./Row.module.css";

const Row = ({ guess, currentGuess }) => {
  if (guess) {
    return (
      <div className={`${styles.row}`}>
        {guess.map((letter, i) => (
          <div key={i} className={styles[letter.color]} data-testid="cell">
            {letter.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    let letters = currentGuess.split("");
    return (
      <div className={`${styles.row}`}>
        {letters.map((letter, i) => (
          <div key={i} data-testid="cell">
            {letter}
          </div>
        ))}
        {[...Array(5 - letters.length)].map((_, i) => (
          <div key={i} data-testid="cell"></div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.row}>
      {[...Array(5)].map((_, i) => (
        <div key={i} data-testid="cell"></div>
      ))}
    </div>
  );
};

export default Row;
