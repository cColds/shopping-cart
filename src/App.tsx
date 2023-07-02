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
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [featuredItems, setFeaturedItems] = useState([]);

  const handleItemClick = (item: Item) => setCurrentItem(item);

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
          <Route
            path="/"
            element={
              <Home items={featuredItems} handleItemClick={handleItemClick} />
            }
          />
          <Route
            path="/store"
            element={<Store items={items} handleItemClick={handleItemClick} />}
          />
          <Route
            path="/store/:id"
            element={<ItemPage currentItem={currentItem} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
