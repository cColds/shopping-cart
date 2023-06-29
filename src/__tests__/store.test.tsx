import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Store from "../pages/Store";
import mockData from "../mockData.json";

// test that items show up when going to store

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

it.skip("should fail to fetch mock.shop api", async () => {
  (fetch as any).mockRejectOnce(new Error("Failed to fetch!"));
  render(
    <MemoryRouter>
      <Store />
    </MemoryRouter>
  );
  expect(screen.queryByText(/slides/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/sweatpants/i)).not.toBeInTheDocument();
});
