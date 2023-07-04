import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

export default function Nav({
  itemCount,
  onToggleCart,
}: {
  itemCount: number;
  onToggleCart: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-6 py-2	shadow-md">
      <Link to="/" aria-label="home page" className="shrink-0">
        <img src={logo} alt="fashonique logo" className="h-[30px] w-[180px]" />
      </Link>
      <form
        role="search"
        className="flex h-[40px] w-[min-content] items-center rounded-lg border-[1px] border-slate-200"
      >
        <button className="m-2">
          <FaSearch className="text-slate-500" />
        </button>
        <input
          type="search"
          id="search"
          placeholder="Search"
          className="bg-transparent p-1"
          autoComplete="off"
        />
      </form>
      <ul className="flex gap-5">
        <li className="flex items-center">
          <Link to="/" className="text-lg">
            Home
          </Link>
        </li>
        <li className="flex items-center">
          <Link to="/store" className="text-lg">
            Store
          </Link>
        </li>
        <li className="flex">
          <button className="relative" onClick={onToggleCart}>
            <FaShoppingCart className="text-xl" />
            <span className="absolute right-[-10px] top-[-5px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-red-600 p-0.5 text-xs text-white">
              {itemCount < 100 ? itemCount : 99 + "+"}
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
}
