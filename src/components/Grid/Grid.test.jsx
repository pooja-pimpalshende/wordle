import { render, screen } from "@testing-library/react";
import Grid from "./Grid";

describe("Grid", () => {
  const guesses = [
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
  ];

  it("should render correctly", () => {
    render(<Grid currentGuess="pa" guesses={guesses} turn={1} message="" />);

    expect(screen.getAllByTestId("row")).toHaveLength(5);
    expect(screen.getAllByText("p")).toHaveLength(3);
    expect(screen.getAllByText("a")).toHaveLength(2);
  });

  it("should render correctly with no guesses and no current guess", () => {
    render(
      <Grid currentGuess="" guesses={[...Array(5)]} turn={0} message="" />
    );
    expect(screen.getAllByTestId("row")).toHaveLength(5);
  });

  it("should render correctly with a message", () => {
    render(
      <Grid
        currentGuess="pa"
        guesses={guesses}
        turn={1}
        message="Test message"
      />
    );
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("should render correctly with only current guess", () => {
    render(
      <Grid currentGuess="pa" guesses={[...Array(5)]} turn={0} message="" />
    );
    expect(screen.getAllByTestId("row")).toHaveLength(5);
    expect(screen.getByText("p")).toBeInTheDocument();
    expect(screen.getByText("a")).toBeInTheDocument();
  });
});
