import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import NotificationButton from '../components/NotificationButton';
import NotificationDropdown from '../components/NotificationDropdown';
import {
  fetchNotificationCount,
  fetchNotifcations,
  clearNotifications,
  touchNotification,
 } from '../actions';
import {
  getNotificationCount,
  getNotifications,
  getIsFetchingNotifications,
  getNotificationsCurrentPage,
  getNotificationsTotalPages,
} from '../store/rootReducer';

class NotificationContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownExpanded: false,
    };

    this.handleNotificationsClick = this._handleNotificationsClick.bind(this);
    this.closeNotificaions = this._closeNotifications.bind(this);
  }

  componentDidMount() {
    this.props.fetchNotificationCount();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.fetchNotificationCount();
    }
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

  render() {
    return (
      <div className="NotificationContainer__root" onClick={this.handleNotificationsClick}>
        <NotificationButton notificationsCount={this.props.notificationsCount} />
        <NotificationDropdown
          isExpanded={this.state.dropdownExpanded}
          notifications={this.props.notifications}
          fetchNotifcations={this.props.fetchNotifcations}
          onCloseDropdown={this.closeNotificaions}
          onTouchNotification={this.props.touchNotification}
          isFetchingNotifications={this.props.isFetchingNotifications}
          notificationsCurrentPage={this.props.notificationsCurrentPage}
          notificationsTotalPages={this.props.notificationsTotalPages}
        />
      </div>
    );
  }
}

NotificationContainer.propTypes = {
  notificationsCount: PropTypes.number,
  notifications: PropTypes.array.isRequired,
  isFetchingNotifications: PropTypes.bool.isRequired,
  notificationsCurrentPage: PropTypes.number,
  notificationsTotalPages: PropTypes.number,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  notificationsCount: getNotificationCount(state),
  notifications: getNotifications(state),
  isFetchingNotifications: getIsFetchingNotifications(state),
  notificationsCurrentPage: getNotificationsCurrentPage(state),
  notificationsTotalPages: getNotificationsTotalPages(state),
});

export default connect(
  mapStateToProps,
  {
    fetchNotificationCount,
    fetchNotifcations,
    clearNotifications,
    touchNotification,
  }
)(NotificationContainer);
