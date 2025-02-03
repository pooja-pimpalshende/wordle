import { render, screen } from "@testing-library/react";
import Wordle from "./Wordle";
import useWordle from "../../hooks/useWordle";
import { vi } from "vitest";

vi.mock("../../hooks/useWordle");

describe("Wordle", () => {
  const solution = "paper";

  it("should render correctly with initial state", () => {
    useWordle.mockReturnValue({
      currentGuess: "",
      turn: 0,
      guesses: [...Array(5)],
      isCorrect: false,
      message: "",
    });
    render(<Wordle solution={solution} />);
    expect(screen.getAllByTestId("row")).toHaveLength(5);
  });

  it("should display win message when the solution is guessed correctly", () => {
    useWordle.mockReturnValue({
      currentGuess: "",
      turn: 0,
      guesses: [...Array(5)],
      isCorrect: true,
      message: "",
    });
    render(<Wordle solution={solution} />);
    expect(screen.getByText("🎉 You Win!")).toBeInTheDocument();
  });

  it("should display game over message when all turns are used", () => {
    useWordle.mockReturnValue({
      currentGuess: "",
      turn: 5,
      guesses: [...Array(5)],
      isCorrect: false,
      message: "",
    });
    render(<Wordle solution={solution} />);
    expect(
      screen.getByText(`😢 Game Over! The correct word is : ${solution}`)
    ).toBeInTheDocument();
  });

  it("should render correctly with a message", () => {
    useWordle.mockReturnValue({
      currentGuess: "",
      turn: 0,
      guesses: [...Array(5)],
      isCorrect: false,
      message: "Test message",
    });
    render(<Wordle solution={solution} />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("should render correctly with guesses and current guess", () => {
    useWordle.mockReturnValue({
      currentGuess: "pa",
      turn: 1,
      guesses: [
        [
          { key: "p", color: "green" },
          { key: "a", color: "yellow" },
          { key: "p", color: "black" },
          { key: "e", color: "black" },
          { key: "r", color: "black" },
        ],
        null,
        null,
        null,
        null,
      ],
      isCorrect: false,
      message: "",
    });
    render(<Wordle solution={solution} />);
    expect(screen.getAllByTestId("row")).toHaveLength(5);
    expect(screen.getAllByText("p")).toHaveLength(3);
    expect(screen.getAllByText("a")).toHaveLength(2);
  });
});
