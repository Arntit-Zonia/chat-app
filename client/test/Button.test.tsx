import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Button from "../src/components/Button";

describe("Button", () => {
  it("renders the button with the provided text", () => {
    render(<Button>Click me</Button>);

    const buttonElement = screen.getByText("Click me");

    expect(buttonElement).toBeInTheDocument();
  });

  it("calls onClick when the button is clicked", () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    const buttonElement = screen.getByText("Click me");

    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when the button is disabled", () => {
    const handleClick = jest.fn();

    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );

    const buttonElement = screen.getByText("Click me");

    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  it("applies the disabled styling when the button is disabled", () => {
    render(<Button disabled>Click me</Button>);

    const buttonElement = screen.getByText("Click me");
    expect(buttonElement).toHaveStyle("background-color: #ccc; cursor: not-allowed;");
  });
});
