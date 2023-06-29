import { useEffect, useState } from "react";
import fetchProducts from "../utils/fetchProducts";
import ItemCards from "../components/ItemCards";

export default function Store() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchProducts(10).then((items) => setItems(items));
  }, []);

  return (
    <section className="flex w-full flex-col items-center p-8">
      <ItemCards items={items} />
    </section>
  );
}
