import styles from "./Introduction.module.css";

const Introduction = () => {
  return (
    <div className={styles.introduction}>
      <h1>Welcome to Wordle!</h1>
      <p>
        Guess the 5-letter word within 5 attempts. Each guess must be a valid
        5-letter word. After each guess, the color of the tiles will change to
        show how close your guess was to the word.
      </p>
    </div>
  );
};

export default Introduction;
