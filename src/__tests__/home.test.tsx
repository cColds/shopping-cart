import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home from "../pages/Home";

it("shop now call to action should link to store", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  const shopNowLink = screen.getByRole("link", { name: /shop now/i });
  expect(shopNowLink).toHaveAttribute("href", "/store");
});
