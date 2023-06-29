import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home from "../pages/Home";
import mockData from "../mockData.json";

it("shop now call to action should link to store", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  const shopNowLink = screen.getByRole("link", { name: /shop now/i });
  expect(shopNowLink).toHaveAttribute("href", "/store");
});

it("should fetch mock.shop api", async () => {
  (fetch as any).mockResponseOnce(JSON.stringify(mockData));

  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(await screen.findByText(/slides/i)).toBeInTheDocument();
  expect(await screen.findByText(/sweatpants/i)).toBeInTheDocument();
});

it("should fail to fetch mock.shop api", async () => {
  (fetch as any).mockRejectOnce(new Error("Failed to fetch!"));
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(screen.queryByText(/slides/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/sweatpants/i)).not.toBeInTheDocument();
});
