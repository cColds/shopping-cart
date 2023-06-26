import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <Link to="/" aria-label="home page">
      <img src={logo} alt="fashonique logo" />
    </Link>
  );
}
