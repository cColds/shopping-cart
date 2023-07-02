import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Store from "./pages/Store";
import { useEffect, useState } from "react";
import fetchProducts from "./utils/fetchProducts";
import ItemPage from "./pages/ItemPage";
import Item from "./interfaces/Item";

function App() {
  const [items, setItems] = useState<Item[] | []>([]);
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedItems = await fetchProducts(10);
      setFeaturedItems(fetchedItems.slice(0, 4));
      setItems(fetchedItems);
    })();
  }, []);

  return (
    <div id="app" className="flex flex-col items-center justify-start">
      <header className="w-full">
        <Nav />
      </header>
      <main className="flex w-full flex-col items-center justify-between">
        <Routes>
          <Route path="/" element={<Home items={featuredItems} />} />
          <Route path="/store" element={<Store items={items} />} />
          <Route path="/store/:itemId" element={<ItemPage items={items} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
