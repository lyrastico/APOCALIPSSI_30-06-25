import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <NavLink to="/">APOCAL’IPSSI</NavLink>
      </div>
      <ul className="navbar__links">
        <li><NavLink to="/register">Inscription</NavLink></li>
        <li><NavLink to="/login">Connexion</NavLink></li>
        <li><NavLink to="/logout">Déconnexion</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
