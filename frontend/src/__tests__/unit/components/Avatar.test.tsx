import { render } from "@testing-library/react";
import Avatar from "../../../components/Avatar";

describe("Avatar Component", () => {
  it("renders default avatar without error", () => {
    render(<Avatar />);
  });

  it("renders avatar with specified color without error", () => {
    render(<Avatar color="primary" />);
  });

  it("renders avatar with children without error", () => {
    render(<Avatar>Child Content</Avatar>);
  });

  it("renders avatar with custom styles without error", () => {
    render(<Avatar sx={{ fontSize: "20px" }} />);
  });
});
