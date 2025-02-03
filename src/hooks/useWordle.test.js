import useWordle from "./useWordle";
import { vi, test, afterEach, it } from "vitest";
import { act, renderHook } from "@testing-library/react";

describe("useWordle", () => {
  const solution = "paper";

  beforeEach(() => {
    vi.mock("../utils/wordleUtils", () => ({
      formatGuess: vi.fn((guess, solution) => {
        return guess.split("").map((letter, i) => ({
          key: letter,
          color: solution[i] === letter ? "green" : "black",
        }));
      }),
      addNewGuess: vi.fn(
        (
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
          setGuesses((prev) => {
            const newGuesses = [...prev];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
          });
          setHistory((prev) => [...prev, currentGuess]);
          setTurn((prev) => prev + 1);
          if (currentGuess === solution) setIsCorrect(true);
          setCurrentGuess("");
        }
      ),
    }));
  });

  afterEach(() => vi.clearAllMocks());

  it("should initialize correctly", () => {
    const { result } = renderHook(() => useWordle(solution));
    expect(result.current.currentGuess).toBe("");
    expect(result.current.history).toEqual([]);
    expect(result.current.guesses).toEqual([...Array(5)]);
    expect(result.current.isCorrect).toBe(false);
    expect(result.current.turn).toBe(0);
  });

  it("should handle keyup events for valid letters", () => {
    const { result } = renderHook(() => useWordle(solution));

    act(() => {
      result.current.handleKeyUp({ key: "p" });
    });
    expect(result.current.currentGuess).toBe("p");

    act(() => {
      result.current.handleKeyUp({ key: "a" });
    });
    expect(result.current.currentGuess).toBe("pa");
  });

  it("should handle keyup events for backspace", () => {
    const { result } = renderHook(() => useWordle(solution));

    act(() => {
      result.current.handleKeyUp({ key: "p" });
      result.current.handleKeyUp({ key: "a" });
      result.current.handleKeyUp({ key: "Backspace" });
    });
    expect(result.current.currentGuess).toBe("p");
  });

  it("should handle keyup events for enter with valid guess", () => {
    const { result } = renderHook(() => useWordle(solution));

    act(() => {
      result.current.handleKeyUp({ key: "p" });
      result.current.handleKeyUp({ key: "a" });
      result.current.handleKeyUp({ key: "p" });
      result.current.handleKeyUp({ key: "e" });
      result.current.handleKeyUp({ key: "r" });
    });

    act(() => {
      result.current.handleKeyUp({ key: "Enter" });
    });

    expect(result.current.guesses[0]).toEqual([
      { key: "p", color: "green" },
      { key: "a", color: "green" },
      { key: "p", color: "green" },
      { key: "e", color: "green" },
      { key: "r", color: "green" },
    ]);

    expect(result.current.history).toEqual(["paper"]);
    expect(result.current.turn).toBe(1);
    expect(result.current.currentGuess).toBe("");
    expect(result.current.isCorrect).toBe(true);
  });

  it("should set message for duplicate guess", () => {
    const { result } = renderHook(() => useWordle(solution));

    act(() => {
      result.current.handleKeyUp({ key: "p" });
      result.current.handleKeyUp({ key: "a" });
      result.current.handleKeyUp({ key: "p" });
      result.current.handleKeyUp({ key: "e" });
      result.current.handleKeyUp({ key: "r" });
    });

    act(() => {
      result.current.handleKeyUp({ key: "Enter" });
    });

    act(() => {
      result.current.handleKeyUp({ key: "p" });
      result.current.handleKeyUp({ key: "a" });
      result.current.handleKeyUp({ key: "p" });
      result.current.handleKeyUp({ key: "e" });
      result.current.handleKeyUp({ key: "r" });
    });

    act(() => {
      result.current.handleKeyUp({ key: "Enter" });
    });

    expect(result.current.message).toBe("You already tried that word");
  });

  it("should set message for invalid guess length", () => {
    const { result } = renderHook(() => useWordle(solution));

    act(() => {
      result.current.handleKeyUp({ key: "p" });
      result.current.handleKeyUp({ key: "a" });
      result.current.handleKeyUp({ key: "p" });
      result.current.handleKeyUp({ key: "e" });
      result.current.handleKeyUp({ key: "Enter" });
    });

    expect(result.current.message).toBe("Word must be 5 characters long");
  });

  it("should set message for exceeding turn limit", () => {
    const { result } = renderHook(() => useWordle(solution));

    const typeWordAndEnter = (word) => {
      word.split("").forEach((letter) => {
        act(() => {
          result.current.handleKeyUp({ key: letter });
        });
      });
      act(() => {
        result.current.handleKeyUp({ key: "Enter" });
      });
    };

    const words = ["apple", "baker", "candy", "delta", "eagle"];

    words.forEach((word) => {
      typeWordAndEnter(word);
    });

    typeWordAndEnter("fable");

    expect(result.current.message).toBe("You used all your guesses");
  });
});
