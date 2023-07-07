import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { AiFillGithub } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="mt-auto flex h-[70px] w-full items-center justify-between border-t-[1px] p-4">
      <div>
        <Link
          to="/"
          aria-label="home page"
          className="shrink-0 transition duration-150 ease-in-out active:scale-95"
        >
          <img
            src={logo}
            alt="fashonique logo"
            className="h-[30px] w-[100px]"
          />
        </Link>
        <p className="text-sm">
          Fashonique {new Date().getFullYear()} | All Rights Reserved
        </p>
      </div>
      <div className="flex">
        <a
          href="https://github.com/ccolds"
          target="_blank"
          className="flex items-center gap-3 transition duration-150 ease-in-out active:scale-95"
        >
          <span className="font-bold">cColds</span>

          <AiFillGithub className="text-2xl" />
        </a>
      </div>
    </footer>
  );
}
