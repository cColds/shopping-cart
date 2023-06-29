import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Items from "../interfaces/Items";
import fetchProducts from "../utils/fetchProducts";

export default function FeaturedItems() {
  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
    fetchProducts(4).then((items) => setItems(items));
  }, []);
  return (
    <section className="m-12 flex w-full flex-col items-center bg-slate-50 p-8 shadow-lg">
      <h2 className="text-center">Featured Items</h2>
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
    </section>
  );
}
