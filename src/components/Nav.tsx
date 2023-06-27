import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Nav() {
  return (
    <div>
      <Link to="/" aria-label="home page">
        <img src={logo} alt="fashonique logo" />
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
    </div>
  );
}
