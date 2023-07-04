import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import Item from "../interfaces/Item";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChangeEvent } from "react";

function ItemPage({
  items,
  onAddToCartClick,
  onDecrementClick,
  onIncrementClick,
  onQuantityInputChange,
  quantity,
  resetQuantity,
}: {
  items: Item[];
  onAddToCartClick: () => void;
  onDecrementClick: () => void;
  onIncrementClick: () => void;
  onQuantityInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  quantity: number;
  resetQuantity: () => void;
}) {
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const { itemId } = useParams();

  useEffect(() => {
    resetQuantity();
  }, [itemId]);

  useEffect(() => {
    const targetItem =
      items.find(
        ({ node: { title } }) => title.toLowerCase() === itemId?.toLowerCase()
      ) || null;
    setCurrentItem(targetItem);
  }, [items, itemId]);

  if (currentItem == null) return null;
  const price = parseFloat(
    currentItem.node.variants.edges[0].node.price.amount
  );

  return (
    <div className="flex flex-col flex-wrap gap-5 p-12">
      <div className="flex gap-5">
        <img
          src={currentItem.node.featuredImage.url}
          alt={currentItem.node.title}
          width="300px"
          height="300px"
          className="rounded-lg"
          draggable="false"
        />

        <div className="flex h-min w-[350px] flex-col gap-5 rounded-lg border-[1px] border-slate-200 p-2.5">
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
              <AiFillMinusCircle className="text-2xl" />
            </button>
            <input
              onChange={(e) => {
                if (+e.target.value > 1000) {
                  e.target.value = "1000";
                }

                if (+e.target.value < 1) {
                  e.target.value = "1";
                }

                onQuantityInputChange(e);
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
            >
              <AiFillPlusCircle />
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
      <div className="min-w-full max-w-min  border-t-[1px] border-slate-200">
        <h3 className="my-1">Description</h3>
        <p>{currentItem.node.description}</p>
      </div>
    </div>
  );
}

export default ItemPage;
