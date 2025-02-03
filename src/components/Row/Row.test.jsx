import { render, screen } from "@testing-library/react";
import Row from "./Row";

describe("Row", () => {
  it("should render past guess correctly", () => {
    const guess = [
      { key: "p", color: "green" },
      { key: "a", color: "yellow" },
      { key: "p", color: "black" },
      { key: "e", color: "black" },
      { key: "r", color: "black" },
    ];
    render(<Row guess={guess} />);
    expect(screen.getAllByText("p")).toHaveLength(2);
    expect(screen.getByText("a")).toBeInTheDocument();
    expect(screen.getByText("e")).toBeInTheDocument();
    expect(screen.getByText("r")).toBeInTheDocument();
  });

  it("should render current guess correctly", () => {
    render(<Row currentGuess="pa" />);
    expect(screen.getByText("p")).toBeInTheDocument();
    expect(screen.getByText("a")).toBeInTheDocument();
  });

  it("should render empty row correctly", () => {
    render(<Row />);
    const emptyCells = screen.getAllByTestId("cell");
    expect(emptyCells).toHaveLength(5);
    emptyCells.forEach((cell) => {
      expect(cell).toBeEmptyDOMElement();
    });
  });

  it("should render partially filled current guess correctly", () => {
    render(<Row currentGuess="pap" />);
    expect(screen.getAllByText("p")).toHaveLength(2);
    expect(screen.getByText("a")).toBeInTheDocument();
  });
});
