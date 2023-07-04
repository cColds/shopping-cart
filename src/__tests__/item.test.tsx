import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import ItemPage from "../pages/ItemPage";
import mockData from "../mockData.json";

let itemCount: number;
let quantity: number;

beforeEach(() => {
  itemCount = 0;
  quantity = 1;
  vi.clearAllMocks();
});

const mockHandleAddToCart = vi.fn(() => {
  itemCount += quantity;
});

const mockHandleDecrement = vi.fn(() => {
  quantity -= 1;
});

const mockHandleIncrement = vi.fn(() => {
  quantity += 1;
});

const mockHandleQuantity = vi.fn();

const mockResetQuantity = vi.fn();

it("should increment item count when clicking add to cart", async () => {
  const user = userEvent.setup();
  const items = mockData.data.products.edges;

  render(
    <MemoryRouter initialEntries={["/store/slides"]}>
      <Routes>
        <Route
          path="/store/:itemId"
          element={
            <ItemPage
              items={items}
              onAddToCartClick={mockHandleAddToCart}
              onDecrementClick={mockHandleDecrement}
              onIncrementClick={mockHandleIncrement}
              onQuantityInputChange={mockHandleQuantity}
              quantity={quantity}
              resetQuantity={mockResetQuantity}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );

  await user.click(screen.getByRole("button", { name: /add to cart/i }));
  await user.click(screen.getByRole("button", { name: /add to cart/i }));
  await user.click(screen.getByRole("button", { name: /add to cart/i }));

  expect(mockHandleAddToCart).toBeCalledTimes(3);
  expect(itemCount).toBe(3);
});

it("should increment quantity by 1", async () => {
  const user = userEvent.setup();
  const items = mockData.data.products.edges;

  render(
    <MemoryRouter initialEntries={["/store/slides"]}>
      <Routes>
        <Route
          path="/store/:itemId"
          element={
            <ItemPage
              items={items}
              onAddToCartClick={mockHandleAddToCart}
              onDecrementClick={mockHandleDecrement}
              onIncrementClick={mockHandleIncrement}
              onQuantityInputChange={mockHandleQuantity}
              quantity={quantity}
              resetQuantity={mockResetQuantity}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );

  await user.click(screen.getByRole("button", { name: /increase quantity/i }));

  expect(mockHandleIncrement).toBeCalledTimes(1);
  expect(quantity).toBe(2);
});

it("should decrement quantity by 1", async () => {
  const user = userEvent.setup();
  const items = mockData.data.products.edges;
  quantity = 3;
  render(
    <MemoryRouter initialEntries={["/store/slides"]}>
      <Routes>
        <Route
          path="/store/:itemId"
          element={
            <ItemPage
              items={items}
              onAddToCartClick={mockHandleAddToCart}
              onDecrementClick={mockHandleDecrement}
              onIncrementClick={mockHandleIncrement}
              onQuantityInputChange={mockHandleQuantity}
              quantity={quantity}
              resetQuantity={mockResetQuantity}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );

  await user.click(screen.getByRole("button", { name: /increase quantity/i }));
  await user.click(screen.getByRole("button", { name: /increase quantity/i }));
  await user.click(screen.getByRole("button", { name: /decrease quantity/i }));
  expect(mockHandleDecrement).toBeCalledTimes(1);
  expect(quantity).toBe(4);
});

it("should not decrement quantity by 1 if it's already 1", async () => {
  const user = userEvent.setup();
  const items = mockData.data.products.edges;

  render(
    <MemoryRouter initialEntries={["/store/slides"]}>
      <Routes>
        <Route
          path="/store/:itemId"
          element={
            <ItemPage
              items={items}
              onAddToCartClick={mockHandleAddToCart}
              onDecrementClick={mockHandleDecrement}
              onIncrementClick={mockHandleIncrement}
              onQuantityInputChange={mockHandleQuantity}
              quantity={quantity}
              resetQuantity={mockResetQuantity}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );

  await user.click(screen.getByRole("button", { name: /decrease quantity/i }));

  expect(mockHandleDecrement).toBeCalledTimes(0);
  expect(quantity).toBe(1);
});

it("should set input quantity to 65", async () => {
  const user = userEvent.setup();
  const items = mockData.data.products.edges;

  render(
    <MemoryRouter initialEntries={["/store/slides"]}>
      <Routes>
        <Route
          path="/store/:itemId"
          element={
            <ItemPage
              items={items}
              onAddToCartClick={mockHandleAddToCart}
              onDecrementClick={mockHandleDecrement}
              onIncrementClick={mockHandleIncrement}
              onQuantityInputChange={mockHandleQuantity}
              quantity={quantity}
              resetQuantity={mockResetQuantity}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );
  const quantityInput = screen.getByRole("spinbutton", {
    name: /item quantity/i,
  });
  await user.type(quantityInput, "65");
  expect(mockHandleQuantity).toHaveBeenCalledTimes(2);
});
