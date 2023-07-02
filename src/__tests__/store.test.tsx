import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Store from "../pages/Store";
import mockData from "../mockData.json";
it("should render featured items", () => {
  const items = mockData.data.products.edges;

  render(
    <MemoryRouter>
      <Store items={items} />
    </MemoryRouter>
  );
  expect(screen.getByText(/slides/i)).toBeInTheDocument();
  expect(screen.getByText(/sweatpants/i)).toBeInTheDocument();
});

it("items in the store should have the correct link", () => {
  const items = mockData.data.products.edges;

  render(
    <MemoryRouter>
      <Store items={items} />
    </MemoryRouter>
  );

  const slides = screen.getByRole("link", { name: /slides for \$25/i });
  const sweatpants = screen.getByRole("link", {
    name: /sweatpants for \$35/i,
  });
  expect(slides).toHaveAttribute("href", "/store/slides");
  expect(sweatpants).toHaveAttribute("href", "/store/sweatpants");
});

it("should render store and match snapshot", () => {
  const items = mockData.data.products.edges;

  const { container } = render(
    <MemoryRouter>
      <Store items={items} />
    </MemoryRouter>
  );
  expect(container).toMatchSnapshot();
});
