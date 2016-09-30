import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import NavLink from './NavLink';
import NotificationContainer from '../containers/NotificationContainer';
import '../styles/Header.css';

class Header extends React.Component {
  renderNavs() {
    if (this.props.isSignedIn) {
      return (
        <ul className="Header__nav-group">
          <li className="Header__nav-link">
            <NavLink to="/explore">
              <i className="fa fa-compass Header__nav-icon" aria-hidden="true"/>
            </NavLink>
          </li>
          <li className="Header__nav-link Header__notification-nav">
            <NotificationContainer location={this.props.location} />
          </li>
          <li className="Header__nav-link">
            <NavLink to={`/${this.props.currentUser.username}`}>
              <i className="fa fa-smile-o Header__nav-icon" aria-hidden="true"/>
            </NavLink>
          </li>
        </ul>
      );
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
      );
    }
  }

  render() {
    return (
      <header className="Header__root">
        <div className="container">
          <div className="row  Header__container">
            <div className="three columns">
              <h1 className="Header__logo">
                <Link to="/" className="Header__logo-link">
                  <i className="fa fa-instagram Header__instagram-icon" aria-hidden="true"/> Hackafy</Link>
              </h1>
            </div>
            <nav className="offset-by-seven two columns">
              {this.renderNavs()}
            </nav>
          </div>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default Header;
