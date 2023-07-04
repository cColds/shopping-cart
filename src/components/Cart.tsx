function Cart({
  isCartOpen,
  onCartToggle,
  itemCount,
}: {
  isCartOpen: boolean;
  onCartToggle: () => void;
  itemCount: number;
}) {
  return isCartOpen ? (
    <div
      onClick={onCartToggle}
      className="fixed right-0 top-0 flex h-full w-full justify-end bg-modal"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex w-[300px] bg-white p-4"
      >
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-3.5">
            <h1 className="text-xl">
              {itemCount ? `Cart (${itemCount} items)` : "Your cart is empty"}
            </h1>

            {itemCount ? (
              "beans"
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
