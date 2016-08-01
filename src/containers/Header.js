import React from 'react';
import  { connect } from 'react-redux';
import { getIsSignedIn } from '../store/rootReducer';
import { Link } from 'react-router';
import NavLink from '../components/NavLink';

import '../styles/Header.css';

class Header extends React.Component {
  renderNavs() {
    if (this.props.isSignedIn) {
      return (
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
      )
    } else {
      return (
        <ul className="Header__nav-group">
          <li className="Header__nav-link">
            <NavLink to="/signin">Sign In</NavLink>
          </li>
          <li className="Header__nav-link">
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
        </ul>
      )
    }
  }

  render() {
    return (
      <header className="Header__root">
        <div className="container">
          <div className="row  Header__container">
            <div className="three columns">
              <h1 className="Header__logo">
                <Link to="/" className="Header__logo-link">Hackafy</Link>
              </h1>
            </div>
            <nav className="offset-by-six three columns">
              {this.renderNavs()}
            </nav>
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  isSignedIn: getIsSignedIn(state),
});

export default connect(
  mapStateToProps
)(Header);
