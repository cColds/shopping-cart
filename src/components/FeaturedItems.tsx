import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
interface Items {
  node: {
    title: string;
    featuredImage: { url: string };
    variants: { edges: [{ node: { price: { amount: string } } }] };
  };
}

export default function FeaturedItems() {
  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://mock.shop/api?query={products(first:%204){edges%20{node%20{id%20title%20description%20featuredImage%20{id%20url}%20variants(first:%201){edges%20{node%20{price%20{amount%20currencyCode}}}}}}}}"
        );
        const {
          data: {
            products: { edges },
          },
        } = await res.json();
        setItems(edges);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);
  return (
    <section className="m-12 flex w-full flex-col items-center bg-slate-50 p-8 shadow-lg">
      <h2 className="text-center text-2xl font-bold">Featured Items</h2>
      <ul className="m-8 flex w-full flex-wrap justify-center gap-12  p-8">
        {items.map(({ node: { featuredImage, title, variants } }) => {
          const price = +variants.edges[0].node.price.amount;
          return (
            <li
              key={uuidv4()}
              className="flex cursor-pointer flex-col items-center "
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
                <div className="flex h-24 flex-col gap-1 text-clip rounded-bl-lg rounded-br-lg bg-white p-2.5">
                  <h3 className="truncate font-bold">{title}</h3>
                  <p className="truncate text-sm">${price}</p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
