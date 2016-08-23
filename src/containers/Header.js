import React from 'react';
import  { connect } from 'react-redux';
import {
  getIsSignedIn,
  getCurrentUser,
  getNotifications,
  getIsFetchingNotifications
} from '../store/rootReducer';
import { fetchNotifcations } from '../actions';
import { Link } from 'react-router';
import NavLink from '../components/NavLink';
import Spinner from '../components/Spinner';
import NotificationItem from '../components/NotificationItem';

import '../styles/Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownExpanded: false,
    };

    this.closeNotificaions = this._closeNotifications.bind(this);
    this.handleNotificationsClick = this._handleNotificationsClick.bind(this);
  }

  _handleNotificationsClick() {
    this.props.fetchNotifcations();
    this.setState({
      dropdownExpanded: true,
    });
  }

  _closeNotifications(event) {
    event.stopPropagation();
    this.setState({ dropdownExpanded: false })
  }

  _renderNotifications() {
    const { notifications, isFetchingNotifications } = this.props;
    console.log('notifications', notifications);
    if (isFetchingNotifications) {
      return (
        <div className="Header__notifications-spinner-container">
          <Spinner />
        </div>
      );
    }

    return (
      <div className="Header__notifications-container">
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            itemClickCallback={this.closeNotificaions} 
          />
        ))}
      </div>
    );
  }

  renderDropdown() {
    if (this.state.dropdownExpanded) {
      return (
        <div>
          <div className="Header__dropdown-overlay" onClick={this.closeNotificaions}/>
          <div className="Header__dropdown-container">
            {this._renderNotifications()}
          </div>
        </div>
      )
    }
  }
  renderNavs() {
    if (this.props.isSignedIn) {
      return (
        <ul className="Header__nav-group">
          <li className="Header__nav-link">
            <NavLink to="/explore">Explore</NavLink>
          </li>
          <li className="Header__nav-link" onClick={this.handleNotificationsClick}>
            <a href="#">Notifications</a>
            {this.renderDropdown()}
          </li>
          <li className="Header__nav-link">
            <NavLink to={`/${this.props.currentUser.username}`}>Profile</NavLink>
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
  currentUser: getCurrentUser(state),
  notifications: getNotifications(state),
  isFetchingNotifications: getIsFetchingNotifications(state),
});

export default connect(
  mapStateToProps,
  { fetchNotifcations }
)(Header);
