import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <div id="app" className="flex flex-col items-center justify-start">
      <header className="w-full">
        <Nav />
      </header>
      <main className="flex w-full flex-col items-center justify-between">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
