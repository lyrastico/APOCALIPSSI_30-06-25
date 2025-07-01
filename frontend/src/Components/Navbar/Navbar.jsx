import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // convertit en booléen
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <NavLink to="/">APOCAL’IPSSI</NavLink>
      </div>
      <ul className="navbar__links">
        {!isLoggedIn ? (
          <>
            <li><NavLink to="/register">Inscription</NavLink></li>
            <li><NavLink to="/login">Connexion</NavLink></li>
          </>
        ) : (
          <li><button onClick={handleLogout} className="logout-button">Déconnexion</button></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
