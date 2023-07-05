import { FaCirclePlus, FaCircleMinus, FaTrash } from "react-icons/fa6";

import Item from "../interfaces/Item";

function Cart({
  isCartOpen,
  onCartToggle,
  itemCount,
  cartItems,
  setCartItems,
  updateItemCount,
  onItemDeleteClick,
}: {
  isCartOpen: boolean;
  onCartToggle: () => void;
  itemCount: number;
  cartItems: Item[];
  setCartItems: (item: Item[]) => void;
  updateItemCount: (items: Item[]) => void;
  onItemDeleteClick: (items: Item) => void;
}) {
  const handleItemCartQuantityChange = (quantity: number, targetItem: Item) => {
    let newQuantity = quantity;
    if (quantity > 1000) newQuantity = 1000;
    else if (quantity < 1) newQuantity = 1;

    const updateItemQuantity = cartItems.map((item) => {
      const newItem = Object.assign({}, item);
      if (item.node.title === targetItem.node.title) {
        newItem.node.quantity = newQuantity;
      }

      return newItem;
    });
    setCartItems(updateItemQuantity);
    updateItemCount(updateItemQuantity);
  };

  const handleIncrementClick = (targetItem: Item) => {
    const { quantity } = targetItem.node;
    const newQuantity = (quantity ?? 0) < 1000 ? (quantity ?? 0) + 1 : 1000;
    const updateItemQuantity = cartItems.map((item) => {
      const newItem = Object.assign({}, item);
      if (item.node.title === targetItem.node.title) {
        newItem.node.quantity = newQuantity;
      }

      return newItem;
    });

    setCartItems(updateItemQuantity);
    updateItemCount(updateItemQuantity);
  };

  const handleDecrementClick = (targetItem: Item) => {
    const { quantity } = targetItem.node;
    const newQuantity = (quantity ?? 0) > 1 ? (quantity ?? 0) - 1 : 1;
    const updateItemQuantity = cartItems.map((item) => {
      const newItem = Object.assign({}, item);
      if (item.node.title === targetItem.node.title) {
        newItem.node.quantity = newQuantity;
      }

      return newItem;
    });

    setCartItems(updateItemQuantity);
    updateItemCount(updateItemQuantity);
  };

  return isCartOpen ? (
    <div
      onClick={onCartToggle}
      className="fixed right-0 top-0 flex h-full w-full justify-end bg-modal"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex w-[450px] bg-white p-4"
      >
        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col gap-3.5">
            <h1 className="text-xl">
              {itemCount
                ? `Cart (${itemCount} item${itemCount > 1 ? "s" : ""})`
                : "Your cart is empty"}
            </h1>

            {itemCount ? (
              <ul className="flex flex-col gap-3">
                {cartItems.map((item) => {
                  const price = +item.node.variants.edges[0].node.price.amount;

                  return (
                    <li
                      className="flex rounded-lg bg-card-gray shadow-lg"
                      key={item.node.id}
                    >
                      <div>
                        <img
                          className="min-w-[100px] max-w-[100px] rounded-l-lg"
                          src={item.node.featuredImage.url}
                          alt={item.node.title}
                          draggable="false"
                        />
                      </div>
                      <div className="flex flex-col justify-between p-2.5">
                        <div>
                          <h2 className="text-base">{item.node.title}</h2>
                          <p className="text-sm text-dark">
                            $
                            {(
                              (item.node.quantity ?? 1) * price
                            ).toLocaleString()}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <label
                            className="text-sm"
                            htmlFor={`quantity-${item.node.id}`}
                          >
                            Quantity:
                          </label>
                          <button
                            className="text-xl"
                            aria-label="decrease quantity"
                            onClick={() => handleDecrementClick(item)}
                          >
                            <FaCircleMinus />
                          </button>
                          <input
                            className="h-[20px] w-[100px] rounded-lg p-2 text-center text-sm"
                            type="number"
                            id={`quantity-${item.node.id}`}
                            value={item.node.quantity}
                            title="quantity"
                            onChange={(e) =>
                              handleItemCartQuantityChange(
                                e.target.valueAsNumber,
                                item
                              )
                            }
                          />
                          <button
                            className="text-xl"
                            aria-label="increase quantity"
                            onClick={() => handleIncrementClick(item)}
                          >
                            <FaCirclePlus />
                          </button>
                        </div>
                      </div>
                      <div className="flex w-full items-start justify-end p-2.5">
                        <button
                          className="text-xl"
                          aria-label="delete item"
                          onClick={() => onItemDeleteClick(item)}
                        >
                          <FaTrash className="text-red-600" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <button
                onClick={onCartToggle}
                className="rounded-lg bg-primary-color p-2 text-center font-poppins-bold text-sm text-white"
              >
                Browse Products
              </button>
            )}
          </div>
          <div className="flex flex-col gap-3.5">
            <p className="text-lg">
              Total: <span className="font-poppins-bold">$24</span>
            </p>
            <button className="rounded-lg bg-primary-color p-2 text-center font-poppins-bold text-sm text-white">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default Cart;
