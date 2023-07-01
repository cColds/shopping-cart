import FeaturedItems from "../components/FeaturedItems";
import Hero from "../components/Hero";
import Items from "../interfaces/Items";

export default function Home({ items }: { items: Items[] }) {
  return (
    <>
      <Hero />
      <FeaturedItems items={items} />
    </>
  );
}
