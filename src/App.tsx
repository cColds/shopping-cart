import { Routes, Route } from "react-router-dom";
import { useEffect, useState, ChangeEvent } from "react";
import Home from "./pages/Home";
import Store from "./pages/Store";
import ItemPage from "./pages/ItemPage";
import Cart from "./components/Cart";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import fetchProducts from "./utils/fetchProducts";
import Item from "./interfaces/Item";

function App() {
  const [items, setItems] = useState<Item[] | []>([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleAddToCartClick = () => {
    setItemCount(itemCount + quantity);
  };

  const handleDecrementClick = () => {
    setQuantity(quantity - 1);
  };

  const handleIncrementClick = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(+e.target.value);
  };

  const resetQuantity = () => {
    setQuantity(1);
  };

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
        <Nav onCartToggle={handleCartToggle} itemCount={itemCount} />
      </header>
      <main className="flex w-full flex-col items-center justify-between">
        <Cart
          isCartOpen={isCartOpen}
          onCartToggle={handleCartToggle}
          itemCount={itemCount}
        />
        <Routes>
          <Route path="/" element={<Home items={featuredItems} />} />
          <Route path="/store" element={<Store items={items} />} />
          <Route
            path="/store/:itemId"
            element={
              <ItemPage
                items={items}
                onAddToCartClick={handleAddToCartClick}
                onDecrementClick={handleDecrementClick}
                onIncrementClick={handleIncrementClick}
                onQuantityInputChange={handleQuantityInputChange}
                quantity={quantity}
                resetQuantity={resetQuantity}
                currentItem={currentItem}
                setCurrentItem={setCurrentItem}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
