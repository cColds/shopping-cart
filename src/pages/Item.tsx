import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import Item from "../interfaces/Items";

export default function ItemPage({
  currentItem,
}: {
  currentItem: Item | null;
}) {
  if (!currentItem) return null;
  const price = currentItem.node.variants?.edges[0].node.price.amount;

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
            <button aria-label="decrease quantity">
              <AiFillMinusCircle className="text-2xl" />
            </button>
            <input
              type="number"
              value="1"
              className="h-[30px] w-full rounded-lg border-[1px] border-slate-200 text-center"
            />
            <button aria-label="increase quantity" className="text-2xl">
              <AiFillPlusCircle />
            </button>
          </div>
          <button className="w-full overflow-hidden truncate rounded-lg bg-primary-color p-2 text-center text-sm font-bold text-white">
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
