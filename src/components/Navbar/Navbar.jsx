import { Icon } from "@iconify/react";
import "./navbar.css";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-div">
        <Link to="/" name="home">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="cart-icon-div">
        <Link to="cart">
          <Icon icon="material-symbols:shopping-cart" className="cart-icon" />
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
