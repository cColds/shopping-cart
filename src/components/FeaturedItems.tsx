import Item from "../interfaces/Item";
import ItemCards from "./ItemCards";

export default function FeaturedItems({ items }: { items: Item[] }) {
  return (
    <section className="flex w-full flex-col items-center bg-slate-50 p-8 shadow-lg">
      <h2 className="text-center">Featured Items</h2>
      <ItemCards items={items} />
    </section>
  );
}
