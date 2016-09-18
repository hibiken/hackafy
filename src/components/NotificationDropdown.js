import React, { PropTypes, Component } from 'react';
import Spinner from './Spinner';
import NotificationItem from './NotificationItem';
import '../styles/NotificationDropdown.css';

class NotificationDropdown extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this._handleScroll.bind(this);
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

  render() {
    if (this.props.isExpanded === false) {
      return null;
    }

    return (
      <div>
        <div className="NotificationDropdown__overlay" onClick={this.props.onCloseDropdown}/>
        <div className="NotificationDropdown__arrow" />
        <div className="NotificationDropdown__arrow-connect" />
        <div
          className="NotificationDropdown__dropdown-wrapper"
          onScroll={this.handleScroll}
          ref="notificationDropdown">
          <div className="notificationDropdown__notifications-container">
            {this.props.notifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                touchNotification={() => this.props.onTouchNotification(notification.id)}
                itemClickCallback={this.props.onCloseDropdown}
              />
            ))}
            {this.props.isFetchingNotifications ? (
              <div className="NotificationDropdown__spinner-container">
                <Spinner />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

NotificationDropdown.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  notifications: PropTypes.array.isRequired,
  fetchNotifcations: PropTypes.func.isRequired,
  onCloseDropdown: PropTypes.func.isRequired,
  onTouchNotification: PropTypes.func.isRequired,
  isFetchingNotifications: PropTypes.bool.isRequired,
  notificationsCurrentPage: PropTypes.number,
  notificationsTotalPages: PropTypes.number,
};

export default NotificationDropdown;
