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

it("nav links path should be correct", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const homeLink = screen.getByRole("link", { name: /^home$/i });
  const storeLink = screen.getByRole("link", { name: /^store$/i });
  const contactAnchorLink = screen.getByRole("link", { name: /^contact$/i });
  expect(homeLink).toHaveAttribute("href", "/");
  expect(storeLink).toHaveAttribute("href", "/store");
  expect(contactAnchorLink).toHaveAttribute("href", "/#contact");
});
