import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Store from "../pages/Store";
import mockData from "../mockData.json";
it("should fetch mock.shop api", async () => {
  (fetch as any).mockResponseOnce(JSON.stringify(mockData));

  render(
    <MemoryRouter>
      <Store />
    </MemoryRouter>
  );
  expect(await screen.findByText(/slides/i)).toBeInTheDocument();
  expect(await screen.findByText(/sweatpants/i)).toBeInTheDocument();
});

it("should fail to fetch mock.shop api", async () => {
  (fetch as any).mockRejectOnce(new Error("Failed to fetch!"));
  render(
    <MemoryRouter>
      <Store />
    </MemoryRouter>
  );
  expect(screen.queryByText(/slides/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/sweatpants/i)).not.toBeInTheDocument();
});

it("items in the store should have the correct link", async () => {
  (fetch as any).mockResponseOnce(JSON.stringify(mockData));
  render(
    <MemoryRouter>
      <Store />
    </MemoryRouter>
  );
  await waitFor(() => {
    const slides = screen.getByRole("link", { name: /slides for \$25/i });
    const sweatpants = screen.getByRole("link", {
      name: /sweatpants for \$35/i,
    });
    expect(slides).toHaveAttribute("href", "/store/slides");
    expect(sweatpants).toHaveAttribute("href", "/store/sweatpants");
  });
});
