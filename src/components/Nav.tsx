import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useState, ChangeEvent } from "react";
import Item from "../interfaces/Item";

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

  const handleSearchToggle = () => {
    if (!isSearchOpen) {
      setSearchResults([]);
      setSearchValue("");
    }
    setIsSearchOpen(!isSearchOpen);
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
    <nav className="flex items-center justify-between gap-3 px-4 py-2	shadow-md">
      <Link to="/" aria-label="home page" className="shrink-0">
        <img src={logo} alt="fashonique logo" className="h-[30px] w-[150px]" />
      </Link>
      <button
        type="button"
        className="flex h-[40px] w-[250px] items-center gap-2 rounded-lg border-[1px] border-slate-200 focus:ring-sky-200"
        onClick={handleSearchToggle}
      >
        <FaSearch className="m-2 mr-0 text-slate-500" aria-hidden="true" />
        <span className="m-2 ml-0 text-sm text-slate-500">Search</span>
      </button>

      <div
        data-search-modal={isSearchOpen}
        className="fixed right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-modal backdrop-blur-sm data-[search-modal='false']:invisible"
        onClick={handleSearchToggle}
        onKeyDown={(e) => {
          if (e.key === "Escape") handleSearchToggle();
        }}
      >
        <div
          className="flex h-[450px] w-[450px] flex-col rounded-lg bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <form
            role="search"
            className="flex h-[60px] w-full items-center border-b-[1px] border-slate-200 p-1"
          >
            <FaSearch className="m-2 text-slate-500" aria-hidden="true" />
            <input
              type="search"
              id="search"
              placeholder="Search"
              autoComplete="off"
              className="h-full w-full focus:ring-0"
              onChange={handleSearchInputChange}
              value={searchValue}
            />
          </form>

          <ul className="flex flex-col gap-2 overflow-auto p-2.5">
            <h1 className="text-lg">
              {searchResults.length
                ? `Items (${searchResults.length})`
                : `No results found`}
            </h1>
            {searchResults.map((item) => {
              const { title } = item.node;
              const itemUrl = title.replace(/\s+/g, "-").toLowerCase();
              return (
                <li key={item.node.id} className="flex">
                  <a
                    className="flex h-[50px] flex-grow items-center rounded-lg border-b-[1px]  border-slate-200 bg-slate-100 p-2.5 text-sm"
                    href={`/store/${itemUrl}`}
                  >
                    {title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <ul className="flex gap-5">
        <li className="flex items-center">
          <Link to="/">Home</Link>
        </li>
        <li className="flex items-center">
          <Link to="/store">Store</Link>
        </li>
        <li className="flex">
          <button className="relative" onClick={onCartToggle}>
            <FaShoppingCart className="text-xl" />
            <span className="absolute right-[-10px] top-[-5px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-red-600 p-0.5 text-xs text-white">
              {itemCount < 100 ? itemCount : 99 + "+"}
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
