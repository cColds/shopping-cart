import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

export default function Nav() {
  return (
    <div className="flex items-center justify-between gap-3 px-6 py-2	shadow-md">
      <Link to="/" aria-label="home page" className="shrink-0">
        <img src={logo} alt="fashonique logo" className="h-[30px] w-[200px]" />
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
      <ul className="flex gap-3 text-lg">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/store">Store</Link>
        </li>
        <li>
          <Link to="#contact">Contact</Link>
        </li>
        <li className="flex">
          <button>
            <FaShoppingCart className="text-xl" />
          </button>
        </li>
      </ul>
    </div>
  );
}
