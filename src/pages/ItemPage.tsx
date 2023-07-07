import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import Item from "../interfaces/Item";

function ItemPage({
  items,
  onAddToCartClick,
  onDecrementClick,
  onIncrementClick,
  onQuantityInputChange,
  quantity,
  resetQuantity,
  currentItem,
  setCurrentItem,
}: {
  items: Item[];
  onAddToCartClick: () => void;
  onDecrementClick: () => void;
  onIncrementClick: () => void;
  onQuantityInputChange: (quantity: number) => void;
  quantity: number;
  resetQuantity: () => void;
  currentItem: Item | null;
  setCurrentItem: (updateItem: Item | null) => void;
}) {
  const { itemId } = useParams();

  useEffect(() => {
    resetQuantity();
  }, [itemId]);

  useEffect(() => {
    const targetItem =
      items.find(
        ({ node: { title } }) =>
          title.replace(/\s+/g, "-").toLowerCase() ===
          itemId?.replace(/\s+/g, "-").toLowerCase()
      ) || null;
    setCurrentItem(targetItem);
  }, [items, itemId]);

  if (currentItem == null) return null;
  const price = parseFloat(
    currentItem.node.variants.edges[0].node.price.amount
  );

  return (
    <div className="flex flex-col flex-wrap gap-5 p-8">
      <div className="flex flex-wrap justify-center gap-5">
        <img
          src={currentItem.node.featuredImage.url}
          alt={currentItem.node.title}
          width="300px"
          height="300px"
          className="rounded-lg"
          draggable="false"
        />

        <div className="flex h-min flex-col gap-5 rounded-lg border-[1px] border-slate-200 p-2.5">
          <div>
            <h1 className="text-xl">{currentItem.node.title}</h1>
            <p className="font-poppins-reg text-lg">${price}</p>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={(e) => {
                if ((e.target as HTMLButtonElement).disabled) return;

                onDecrementClick();
              }}
              aria-label="decrease quantity"
              disabled={quantity === 1}
            >
              <FaCircleMinus className="text-2xl" />
            </button>
            <input
              onChange={(e) => {
                let quantity = e.target.valueAsNumber;
                if (quantity > 1000) quantity = 1000;
                else if (quantity < 1) quantity = 1;

                onQuantityInputChange(quantity);
              }}
              aria-label="item quantity"
              type="number"
              value={quantity}
              className="h-[30px] w-full rounded-lg border-[1px] border-slate-200 text-center"
            />
            <button
              onClick={onIncrementClick}
              aria-label="increase quantity"
              className="text-2xl"
              disabled={quantity >= 1000}
            >
              <FaCirclePlus />
            </button>
          </div>
          <button
            onClick={onAddToCartClick}
            className="w-full overflow-hidden truncate rounded-lg bg-primary-color p-2 text-center text-sm font-bold text-white"
          >
            Add to cart
          </button>
        </div>
      </div>
      <div className="min-w-full max-w-min border-t-[1px] border-slate-200">
        <h3 className="my-1">Description</h3>
        <p>{currentItem.node.description}</p>
      </div>
    </div>
  );
}

export default ItemPage;
