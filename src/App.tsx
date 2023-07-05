import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
  const [cartItems, setCartItems] = useState<Item[] | []>([]);

  const updateItemCount = (items: Item[]) => {
    const updatedItemCount = items.reduce((acc, curr) => {
      return acc + (curr.node.quantity ?? 0);
    }, 0);

    setItemCount(updatedItemCount);
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleAddToCartClick = () => {
    if (currentItem == null) return;

    // If cartItem exists alreadys, use its quantity instead of relying on currentItem,
    // which resets to null after leaving page and can set quantity incorrectly
    const cartItem = cartItems.find(
      (item) => item.node.title === currentItem.node.title
    );

    const currentQuantity = cartItem?.node.quantity;
    const newQuantity =
      currentQuantity == null ? quantity : currentQuantity + quantity;
    if (newQuantity > 1000) return;

    const updatedItem = {
      ...currentItem,
      node: {
        ...currentItem.node,
        quantity: newQuantity,
      },
    };

    setCurrentItem(updatedItem);
    setItemCount(itemCount + quantity);

    if (currentQuantity == null) {
      updatedItem.node.id = uuidv4();
      setCartItems([...cartItems, updatedItem]);
      return;
    }
    const replaceOldItem = cartItems.map((item) => {
      if (item.node.title === currentItem.node.title) {
        return updatedItem;
      }

      return item;
    });

    setCartItems(replaceOldItem);
  };

  const handleDecrementClick = () => {
    setQuantity(quantity - 1);
  };

  const handleIncrementClick = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityInputChange = (quantity: number) => setQuantity(quantity);

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
          cartItems={cartItems}
          setCartItems={setCartItems}
          updateItemCount={updateItemCount}
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
