import FeaturedItems from "../components/FeaturedItems";
import Hero from "../components/Hero";
import Item from "../interfaces/Item";

export default function Home({
  items,
  handleItemClick,
}: {
  items: Item[];
  handleItemClick: (item: Item) => void;
}) {
  return (
    <>
      <Hero />
      <FeaturedItems items={items} handleItemClick={handleItemClick} />
    </>
  );
}
