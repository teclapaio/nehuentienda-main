import React from "react";
import CartWidget from "../CartWidget/CartWidget";
import MenuPositions from "../MenuPositions/MenuPositions";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="nav-container">
      <ul className="nav-ul" style={{ listStyle: "none" }}>
        <Link className="li" to="/">
          Home
        </Link>
        <MenuPositions />
        <Link className="li" to="/Politicas">
          Politicas de Compra
        </Link>
        <Link className="li" to="/contacto">
          Contacto
        </Link>
        <li>
          <CartWidget />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
