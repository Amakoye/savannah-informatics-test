import { render } from "@testing-library/react";
import React from "react";
import useResponsive from "../../../hooks/useResponsive";

describe("useResponsive hook", () => {
  // Mocking MUI useTheme and useMediaQuery
  jest.mock("@mui/material/styles", () => ({
    ...jest.requireActual("@mui/material/styles"),
    useTheme: jest.fn(),
  }));

  jest.mock("@mui/material/useMediaQuery", () => jest.fn());

  it("should return the correct media query result for 'up'", () => {
    // Mocking theme.breakpoints and useMediaQuery results
    const breakpoints = {
      up: jest.fn(),
      down: jest.fn(),
      between: jest.fn(),
      only: jest.fn(),
    };

    const mockUseTheme = {
      breakpoints,
    };

    const mockUseMediaQuery = jest.fn();

    breakpoints.up.mockReturnValue(true);

    jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());

    // Mocking useTheme and useMediaQuery hooks
    jest
      .requireMock("@mui/material/styles")
      .useTheme.mockReturnValue(mockUseTheme);
    jest
      .requireMock("@mui/material/useMediaQuery")
      .mockReturnValue(mockUseMediaQuery);

    // Render the component with the hook
    render(<TestComponent />);

    // You can add assertions here based on your specific use case
  });

  // Define a functional component to use the hook
  const TestComponent = () => {
    const result = useResponsive("up", "md");
    return <div>{result ? "true" : "false"}</div>;
  };
});
