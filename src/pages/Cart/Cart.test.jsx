import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "./Cart";

describe("Cart component", () => {
  const mockCartList = [
    {
      id: 1,
      name: "Product 1",
      price: 10,
      quantity: 2,
      totalPrice: 20,
    },
    {
      id: 2,
      name: "Product 2",
      price: 15,
      quantity: 1,
      totalPrice: 15,
    },
  ];

  beforeEach(() => {
    // Mock the fetch API response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockCartList),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders a list of cart products when cartList is not empty", async () => {
    render(<Cart />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("displays a message when cartList is empty", async () => {
    // Mock an empty cart list response
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    render(<Cart />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(screen.getByText("No Products In Cart")).toBeInTheDocument();
  });

  it("updates the order total when a product is removed", async () => {
    render(<Cart />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Click the "remove" button for the first product
    const removeButton = screen.getAllByRole("button", { name: "Remove" })[0];
    userEvent.click(removeButton);

    // The first product should no longer be displayed
    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();

    // The order total should have decreased by the price of the first product
    expect(screen.getByText("Order Total : Rs. 15")).toBeInTheDocument();
  });

  it("disables the checkout button when cartList is empty", async () => {
    // Mock an empty cart list response
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    render(<Cart />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    const checkoutButton = screen.getByRole("button", { name: "CHECKOUT" });
    expect(checkoutButton).toBeDisabled();
  });

  it("navigates to the shopping page when the Return to Shopping button is clicked", async () => {
    const { history } = render(<Cart />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    const returnButton = screen.getByRole("button", { name: "RETURN TO SHOPPING" });
    userEvent.click(returnButton);

    expect(history.location.pathname).toEqual("/");
  });
});
