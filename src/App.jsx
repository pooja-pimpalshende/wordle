import { useEffect, useState } from "react";
import Wordle from "./components/Wordle/Wordle";
import data from "../data/db.json";
import Introduction from "./components/Introduction/Introduction";

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const randomSolution =
      data.solution[Math.floor(Math.random() * data.solution.length)];
    setSolution(randomSolution.word.toLowerCase());
  }, []);

  return (
    <div>
      <Introduction />
      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;
