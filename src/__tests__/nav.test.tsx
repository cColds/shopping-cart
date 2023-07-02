import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Nav from "../components/Nav";

it("logo should link to home page", () => {
  render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  );
  const logoLink = screen.getByRole("link", { name: /home page/i });
  expect(logoLink).toHaveAttribute("href", "/");
});

it("nav links path should be correct", () => {
  render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  );
  const homeLink = screen.getByRole("link", { name: /^home$/i });
  const storeLink = screen.getByRole("link", { name: /^store$/i });
  const contactAnchorLink = screen.getByRole("link", { name: /^contact$/i });
  expect(homeLink).toHaveAttribute("href", "/");
  expect(storeLink).toHaveAttribute("href", "/store");
  expect(contactAnchorLink).toHaveAttribute("href", "/#contact");
});

it("renders nav", () => {
  const { container } = render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  );
  expect(container).toMatchSnapshot();
});
