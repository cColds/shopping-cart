import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "../App";

// TESTS:
// searchbar renders correctly
// nav links go to the correct path
it("logo should link to home page", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const logoLink = screen.getByRole("link", { name: /home page/i });
  expect(logoLink).toHaveAttribute("href", "/");
});
