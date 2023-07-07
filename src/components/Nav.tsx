import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { useState, ChangeEvent } from "react";
import Item from "../interfaces/Item";
import Menu from "./modals/Menu";
import Search from "./modals/Search";

export default function Nav({
  itemCount,
  onCartToggle,
  items,
}: {
  itemCount: number;
  onCartToggle: () => void;
  items: Item[];
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    const invertIsMenuOpen = !isMenuOpen;
    if (invertIsMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    setIsMenuOpen(invertIsMenuOpen);
  };

  const handleSearchToggle = () => {
    const invertIsSearchOpen = !isSearchOpen;
    if (invertIsSearchOpen) {
      setSearchResults([]);
      setSearchValue("");
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    setIsSearchOpen(invertIsSearchOpen);
  };
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedSearchValue = e.target.value.toLowerCase();
    setSearchValue(updatedSearchValue);
    if (updatedSearchValue.trim() === "") {
      setSearchResults([]);
      return;
    }

    const updatedSearchResults = items.filter((item) => {
      const { title } = item.node;
      if (title.toLowerCase().includes(updatedSearchValue.trim())) return item;
    });

    setSearchResults(updatedSearchResults);
  };

  return (
    <nav className="flex h-full flex-col items-center justify-between gap-3 px-4 py-2 shadow-md xs:h-[60px] xs:flex-row">
      <Link to="/" aria-label="home page" className="shrink-0">
        <img src={logo} alt="fashonique logo" className="h-[30px] w-[150px]" />
      </Link>
      <button
        type="button"
        className="hidden h-[40px] w-[300px] items-center gap-2 rounded-lg border-[1px] border-slate-200 sm:flex"
        onClick={handleSearchToggle}
      >
        <FaSearch className="m-2 mr-0 text-slate-500" aria-hidden="true" />
        <span className="m-2 ml-0 text-sm text-slate-500">Search</span>
      </button>

      <ul className="flex gap-5">
        <li className="flex items-center sm:hidden">
          <button
            type="button"
            className="h-[40px] items-center justify-center rounded-lg"
            onClick={handleSearchToggle}
          >
            <FaSearch className="m-2 mr-0 text-slate-500" aria-hidden="true" />
          </button>
        </li>
        <li className="hidden items-center sm:flex">
          <Link to="/">Home</Link>
        </li>
        <li className="hidden items-center sm:flex">
          <Link to="/store">Store</Link>
        </li>
        <li className="flex items-center">
          <button className="relative" onClick={onCartToggle}>
            <FaShoppingCart className="h-5 w-5" />
            <span className="absolute right-[-10px] top-[-5px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-red-600 p-0.5 text-xs text-white">
              {itemCount < 100 ? itemCount : 99 + "+"}
            </span>
          </button>
        </li>

        <li className="flex items-center sm:hidden">
          <button className="relative" onClick={handleMenuToggle}>
            <MdMenu className="h-6 w-6" />
          </button>
        </li>
      </ul>

      {isSearchOpen ? (
        <Search
          onSearchToggle={handleSearchToggle}
          onSearchInputChange={handleSearchInputChange}
          searchValue={searchValue}
          searchResults={searchResults}
        />
      ) : null}

      {isMenuOpen ? (
        <Menu onMenuToggle={handleMenuToggle} onCartToggle={onCartToggle} />
      ) : null}
    </nav>
  );
}
