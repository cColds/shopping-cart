import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Store from "./pages/Store";

function App() {
  return (
    <div id="app" className="flex flex-col items-center justify-start">
      <header className="w-full">
        <Nav />
      </header>
      <main className="flex w-full flex-col items-center justify-between">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/:id" element={<div>Item page</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
