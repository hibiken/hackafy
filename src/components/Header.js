import React from 'react';
import { Link } from 'react-router';
import NavLink from './NavLink';

import '../styles/Header.css';

const Header = (props) => {
  return (
    <header className="Header__root">
      <div className="container">
        <div className="row  Header__container">
          <div className="three columns">
            <h1 className="Header__logo">
              <Link to="/" className="Header__logo-link">Hackafy</Link>
            </h1>
          </div>
          <nav className="offset-by-five four columns">
            <ul className="Header__nav-group">
              <li className="Header__nav-link">
                <NavLink to="/explore">Explore</NavLink>
              </li>
              <li className="Header__nav-link">
                <NavLink to="/likes">Likes</NavLink>
              </li>
              <li className="Header__nav-link">
                <NavLink to="/profile">Profile</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
