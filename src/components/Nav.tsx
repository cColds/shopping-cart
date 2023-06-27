import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

export default function Nav() {
  return (
    <div className="flex justify-between px-6 py-2 gap-3 items-center	shadow-md">
      <Link to="/" aria-label="home page" className="shrink-0">
        <img src={logo} alt="fashonique logo" className="w-[200px] h-[30px]" />
      </Link>
      <form
        role="search"
        className="flex items-center border-[1px] border-slate-200 rounded-lg h-[40px] w-[min-content]"
      >
        <button className="m-2">
          <FaSearch className="text-slate-500" />
        </button>
        <input
          type="search"
          id="search"
          placeholder="Search"
          className="p-1 bg-transparent"
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
