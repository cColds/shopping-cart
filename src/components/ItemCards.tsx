import { Link } from "react-router-dom";
import Item from "../interfaces/Item";
import ItemImage from "./ItemImage";

export default function ItemCards({ items }: { items: Item[] }) {
  return (
    <ul className="m-8 flex w-full flex-wrap justify-center gap-12 p-8">
      {items.map(({ node }) => {
        const { featuredImage, title, variants } = node;
        const price = +variants.edges[0].node.price.amount;
        return (
          <li
            key={node.title}
            className="flex cursor-pointer flex-col items-center transition duration-150 ease-in-out active:scale-95"
          >
            <Link
              to={`/store/${title.replace(/\s+/g, "-").toLowerCase()}`}
              className="w-[200px]"
              aria-label={`${title} for $${price}`}
            >
              <ItemImage
                alt={title}
                src={featuredImage.url}
                width="200"
                height="200"
                className="rounded-t-lg"
              />
              <div className="flex h-24 flex-col gap-1 rounded-bl-lg rounded-br-lg bg-white p-2.5 shadow-lg">
                <h3 className="truncate">{title}</h3>
                <p className="truncate">${price}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
