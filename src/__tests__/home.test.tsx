import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home from "../pages/Home";
import mockData from "../mockData.json";
import Hero from "../components/Hero";

it("shop now call to action should link to store", () => {
  render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>
  );

  const shopNowLink = screen.getByRole("link", { name: /shop now/i });
  expect(shopNowLink).toHaveAttribute("href", "/store");
});

it("should render featured items", async () => {
  const items = mockData.data.products.edges;

  render(
    <MemoryRouter>
      <Home items={items} />
    </MemoryRouter>
  );
  expect(await screen.findByText(/slides/i)).toBeInTheDocument();
  expect(await screen.findByText(/sweatpants/i)).toBeInTheDocument();
});
