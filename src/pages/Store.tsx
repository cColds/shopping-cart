import ItemCards from "../components/ItemCards";
import Item from "../interfaces/Item";

export default function Store({
  items,
  handleItemClick,
}: {
  items: Item[];
  handleItemClick: (item: Item) => void;
}) {
  return (
    <section className="flex w-full flex-col items-center p-8">
      <ItemCards items={items} handleItemClick={handleItemClick} />
    </section>
  );
}
