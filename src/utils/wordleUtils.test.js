import { formatGuess, addNewGuess } from "./wordleUtils";

describe("wordleUtils", () => {
  const solution = "paper";

  describe("formatGuess", () => {
    it("should format guess correctly with all correct letters", () => {
      const formattedGuess = formatGuess("paper", solution);
      expect(formattedGuess).toEqual([
        { key: "p", color: "green" },
        { key: "a", color: "green" },
        { key: "p", color: "green" },
        { key: "e", color: "green" },
        { key: "r", color: "green" },
      ]);
    });

    it("should format guess correctly with some correct letters", () => {
      const formattedGuess = formatGuess("pacer", solution);
      expect(formattedGuess).toEqual([
        { key: "p", color: "green" },
        { key: "a", color: "green" },
        { key: "c", color: "black" },
        { key: "e", color: "green" },
        { key: "r", color: "green" },
      ]);
    });

    it("should format guess correctly with no correct letters", () => {
      const formattedGuess = formatGuess("lucky", solution);
      expect(formattedGuess).toEqual([
        { key: "l", color: "black" },
        { key: "u", color: "black" },
        { key: "c", color: "black" },
        { key: "k", color: "black" },
        { key: "y", color: "black" },
      ]);
    });

    it("should format guess correctly with some letters in wrong positions", () => {
      const formattedGuess = formatGuess("reaps", solution);
      expect(formattedGuess).toEqual([
        { key: "r", color: "yellow" },
        { key: "e", color: "yellow" },
        { key: "a", color: "yellow" },
        { key: "p", color: "yellow" },
        { key: "s", color: "black" },
      ]);
    });
  });

  describe("addNewGuess", () => {
    it("should add new guess correctly", () => {
      const setGuesses = vi.fn();
      const setHistory = vi.fn();
      const setTurn = vi.fn();
      const setCurrentGuess = vi.fn();
      const setIsCorrect = vi.fn();

      const formattedGuess = [
        { key: "p", color: "green" },
        { key: "a", color: "green" },
        { key: "p", color: "green" },
        { key: "e", color: "green" },
        { key: "r", color: "green" },
      ];

      addNewGuess(
        0,
        formattedGuess,
        "paper",
        solution,
        setGuesses,
        setHistory,
        setTurn,
        setCurrentGuess,
        setIsCorrect
      );

      const updateHistory = setHistory.mock.calls[0][0];
      expect(updateHistory([])).toEqual(["paper"]);

      const updateTurn = setTurn.mock.calls[0][0];
      expect(updateTurn(0)).toBe(1);

      expect(setGuesses).toHaveBeenCalledWith(expect.any(Function));
      expect(setCurrentGuess).toHaveBeenCalledWith("");
      expect(setIsCorrect).toHaveBeenCalledWith(true);
    });
  });
});
