import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { FaX, FaStore } from "react-icons/fa6";
import { FaShoppingCart, FaHome } from "react-icons/fa";

export default function Menu({
  onMenuToggle,
  onCartToggle,
}: {
  onMenuToggle: () => void;
  onCartToggle: () => void;
}) {
  return (
    <div
      className="fixed right-0 top-0 z-50 flex h-full w-full items-center justify-end bg-modal backdrop-blur-sm"
      onClick={onMenuToggle}
    >
      <div
        className="flex h-full w-[250px] flex-col gap-5 bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <Link to="/" aria-label="home page" className="shrink-0">
            <img
              src={logo}
              alt="fashonique logo"
              className="h-[30px] w-[150px]"
            />
          </Link>
          <button onClick={onMenuToggle}>
            <FaX className="h-5 w-5" />
          </button>
        </div>
        <ul className="flex flex-col items-center gap-4 ">
          <li className="flex w-full">
            <Link to="/" className="flex w-full gap-5" onClick={onMenuToggle}>
              <FaHome className="h-6 w-6" />
              <span>Home</span>
            </Link>
          </li>
          <li className="flex w-full">
            <Link
              to="/store"
              className="flex w-full gap-5"
              onClick={onMenuToggle}
            >
              <FaStore className="h-6 w-6" />
              <span>Store</span>
            </Link>
          </li>

          <li className="flex w-full">
            <button
              className="flex w-full gap-5"
              onClick={() => {
                onMenuToggle();
                onCartToggle();
              }}
            >
              <FaShoppingCart className="h-6 w-6" />
              <span>Cart</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
