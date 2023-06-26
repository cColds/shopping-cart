import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "../App";

// TESTS:
// searchbar renders correctly
// nav links go to the correct path
it("should go to home page if logo is clicked", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const logoLink = screen.getByRole("link", { name: /home page/i });
  expect(logoLink).toHaveAttribute("href", "/");
  expect(
    screen.getByRole("heading", {
      name: /your one-stop destination for all your shopping needs/i,
    })
  ).toBeInTheDocument();
});
