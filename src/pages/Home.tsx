import FeaturedItems from "../components/FeaturedItems";
import Hero from "../components/Hero";
import Item from "../interfaces/Item";

export default function Home({ items }: { items: Item[] }) {
  return (
    <>
      <Hero />
      <FeaturedItems items={items} />
    </>
  );
}
