import { useState, useEffect } from "react";
import Items from "../interfaces/Items";
import ItemCards from "./ItemCards";
import fetchProducts from "../utils/fetchProducts";

export default function FeaturedItems() {
  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
    fetchProducts(4).then((items) => setItems(items));
  }, []);
  return (
    <section className="m-12 flex w-full flex-col items-center bg-slate-50 p-8 shadow-lg">
      <h2 className="text-center">Featured Items</h2>
      <ItemCards items={items} />
    </section>
  );
}
