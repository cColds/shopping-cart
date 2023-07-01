import ItemCards from "../components/ItemCards";
import Items from "../interfaces/Items";

export default function Store({ items }: { items: Items[] }) {
  return (
    <section className="flex w-full flex-col items-center p-8">
      <ItemCards items={items} />
    </section>
  );
}
