import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Nav from "../components/Nav";
import mockData from "../mockData.json";

const mockHandleCartToggle = vi.fn();
const mockItems = mockData.data.products.edges;

it("logo should link to home page", () => {
  render(
    <MemoryRouter>
      <Nav
        items={mockItems}
        itemCount={0}
        onCartToggle={mockHandleCartToggle}
      />
    </MemoryRouter>
  );
  const logoLink = screen.getByRole("link", { name: /home page/i });
  expect(logoLink).toHaveAttribute("href", "/");
});

it("nav links path should be correct", () => {
  render(
    <MemoryRouter>
      <Nav
        items={mockItems}
        itemCount={0}
        onCartToggle={mockHandleCartToggle}
      />
    </MemoryRouter>
  );
  const homeLink = screen.getByRole("link", { name: /^home$/i });
  const storeLink = screen.getByRole("link", { name: /^store$/i });
  expect(homeLink).toHaveAttribute("href", "/");
  expect(storeLink).toHaveAttribute("href", "/store");
});

it("should render nav and match snapshot", () => {
  const { container } = render(
    <MemoryRouter>
      <Nav
        items={mockItems}
        itemCount={0}
        onCartToggle={mockHandleCartToggle}
      />
    </MemoryRouter>
  );
  expect(container).toMatchSnapshot();
});

it("should set cart item count to 3", () => {
  render(
    <MemoryRouter>
      <Nav
        items={mockItems}
        itemCount={3}
        onCartToggle={mockHandleCartToggle}
      />
    </MemoryRouter>
  );

  expect(screen.getByText(3)).toBeInTheDocument();
});

it("should limit max cart item count displayed to 99", () => {
  render(
    <MemoryRouter>
      <Nav
        items={mockItems}
        itemCount={150}
        onCartToggle={mockHandleCartToggle}
      />
    </MemoryRouter>
  );

  expect(screen.getByText("99+")).toBeInTheDocument();
});
