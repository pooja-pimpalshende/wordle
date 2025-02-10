import Row from "../Row/Row";

const Grid = ({ currentGuess, guesses, turn, message }) => {
  return (
    <div>
      {guesses.map((guess, i) => (
        <div key={`guess-${i}`} data-testid="row">
          <Row guess={guess} currentGuess={i === turn ? currentGuess : null} />
        </div>
      ))}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Grid;
