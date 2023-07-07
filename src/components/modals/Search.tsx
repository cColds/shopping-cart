import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Item from "../../interfaces/Item";
import { ChangeEvent } from "react";

export default function Search({
  onSearchToggle,
  onSearchInputChange,
  searchValue,
  searchResults,
}: {
  onSearchToggle: () => void;
  onSearchInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  searchResults: Item[];
}) {
  return (
    <div
      className="fixed right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-modal backdrop-blur-sm"
      onClick={onSearchToggle}
    >
      <div
        className="m-4 flex h-[450px] w-[450px] flex-col rounded-lg bg-white"
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
            onChange={onSearchInputChange}
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
                  onClick={onSearchToggle}
                >
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
