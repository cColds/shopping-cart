import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Store from "./pages/Store";
import { useEffect, useState } from "react";
import fetchProducts from "./utils/fetchProducts";

function App() {
  const [items, setItems] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    fetchProducts(10)
      .then((items) => {
        setFeaturedItems(items.slice(0, 4));
        setItems(items);
      })
      .catch((e) => console.error(e));
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
          <Route path="/store/:id" element={<div>Item page</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
