import { v4 as uuidv4 } from "uuid";
import Items from "../interfaces/Items";

interface ItemCardsProps {
  items: Items[];
}

export default function ItemCards({ items }: ItemCardsProps) {
  return (
    <ul className="m-8 flex w-full flex-wrap justify-center gap-12 p-8">
      {items.map(({ node: { featuredImage, title, variants } }) => {
        const price = +variants.edges[0].node.price.amount;
        return (
          <li
            key={uuidv4()}
            className="flex cursor-pointer flex-col items-center"
          >
            <a href="/" className="w-[200px]">
              <img
                src={featuredImage.url}
                alt={title}
                width="200px"
                height="200px"
                className="rounded-tl-lg rounded-tr-lg"
                draggable="false"
              />
              <div className="flex h-24 flex-col gap-1 rounded-bl-lg rounded-br-lg bg-white p-2.5">
                <h3 className="truncate">{title}</h3>
                <p className="truncate">${price}</p>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
