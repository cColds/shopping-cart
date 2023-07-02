import ItemCards from "../components/ItemCards";
import Item from "../interfaces/Item";

export default function Store({ items }: { items: Item[] }) {
  return (
    <section className="flex w-full flex-col items-center p-8">
      <ItemCards items={items} />
    </section>
  );
}
