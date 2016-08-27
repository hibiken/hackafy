import React from 'react';
import  { connect } from 'react-redux';
import {
  getIsSignedIn,
  getCurrentUser,
  getNotifications,
  getIsFetchingNotifications,
  getNotificationsCurrentPage,
  getNotificationsTotalPages
} from '../store/rootReducer';
import { fetchNotifcations, clearNotifications, touchNotification } from '../actions';
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
    this.handleScroll = this._handleScroll.bind(this);
  }

  _handleNotificationsClick() {
    this.props.clearNotifications();
    this.props.fetchNotifcations();

    this.setState({
      dropdownExpanded: true,
    });
  }

  _closeNotifications(event) {
    event.stopPropagation();
    this.setState({ dropdownExpanded: false })
  }

  _shouldFetchNotifcations() {
    const {
      isFetchingNotifications,
      notificationsCurrentPage,
      notificationsTotalPages
    } = this.props;
    return (
      !isFetchingNotifications &&
      (notificationsCurrentPage === null || notificationsCurrentPage < notificationsTotalPages)
    );
  }

  _handleScroll(event) {
    const { scrollTop, scrollHeight, clientHeight } = this.refs.notificationDropdown;
    const offset = 50;
    if (scrollHeight - scrollTop <= clientHeight + offset && this._shouldFetchNotifcations()) {
      this.props.fetchNotifcations();
    }
  }

  _renderNotifications() {
    const { notifications, isFetchingNotifications } = this.props;

    return (
      <div className="Header__notifications-container">
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            touchNotification={() => this.props.touchNotification(notification.id)}
            itemClickCallback={this.closeNotificaions}
          />
        ))}
        {isFetchingNotifications ? (
          <div className="Header__notifications-spinner-container">
            <Spinner />
          </div>
        ) : null}
      </div>
    );
  }

  renderDropdown() {
    if (this.state.dropdownExpanded) {
      return (
        <div>
          <div className="Header__dropdown-overlay" onClick={this.closeNotificaions}/>
          <div className="Header__dropdown-arrow" />
          <div className="Header__dropdown-arrow-connect" />
          <div
            className="Header__dropdown-container"
            onScroll={this.handleScroll}
            ref="notificationDropdown">
            {this._renderNotifications()}
          </div>
        </div>
      )
    }
  }

  renderNotificationIcon() {
    if (this.props.notificationCount === 0) {
      return (<a className="Header__notification-link" href="#"><i className="fa fa-bell-o" aria-hidden="true"/></a>);
    } else {
      return (
        <a className="Header__notification-link Header__notification-link--active" href="#">
          {this.props.notificationCount}
        </a>
      );
    }
  }

  renderNavs() {
    if (this.props.isSignedIn) {
      return (
        <ul className="Header__nav-group">
          <li className="Header__nav-link">
            <NavLink to="/explore">Explore</NavLink>
          </li>
          <li className="Header__nav-link Header__notification-nav" onClick={this.handleNotificationsClick}>
            {this.renderNotificationIcon()}
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
  notificationsCurrentPage: getNotificationsCurrentPage(state),
  notificationsTotalPages: getNotificationsTotalPages(state),
});


export default connect(
  mapStateToProps,
  { fetchNotifcations, clearNotifications, touchNotification }
)(Header);
