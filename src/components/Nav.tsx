import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaHome, FaStore } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { FaX } from "react-icons/fa6";
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

      <div
        data-search-modal={isSearchOpen}
        className="fixed right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-modal backdrop-blur-sm data-[search-modal='false']:invisible"
        onClick={handleSearchToggle}
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
                  <Link
                    className="flex h-[50px] flex-grow items-center rounded-lg border-b-[1px]  border-slate-200 bg-slate-100 p-2.5 text-sm"
                    to={`/store/${itemUrl}`}
                    onClick={handleSearchToggle}
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {isMenuOpen ? (
        <div
          data-modal={isMenuOpen}
          className="fixed right-0 top-0 z-50 flex h-full w-full items-center justify-end bg-modal backdrop-blur-sm data-[modal='false']:invisible"
          onClick={handleMenuToggle}
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
              <button onClick={handleMenuToggle}>
                <FaX />
              </button>
            </div>

            <ul className="flex flex-col items-center gap-4 ">
              <li className="flex w-full">
                <Link
                  to="/"
                  className="flex w-full gap-5"
                  onClick={handleMenuToggle}
                >
                  <FaHome className="h-6 w-6" />
                  <span>Home</span>
                </Link>
              </li>
              <li className="flex w-full">
                <Link
                  to="/store"
                  className="flex w-full gap-5"
                  onClick={handleMenuToggle}
                >
                  <FaStore className="h-6 w-6" />
                  <span>Store</span>
                </Link>
              </li>

              <li className="flex w-full">
                <button
                  className="flex w-full gap-5"
                  onClick={() => {
                    handleMenuToggle();
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
      ) : null}
    </nav>
  );
}
