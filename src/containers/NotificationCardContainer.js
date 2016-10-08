import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import NotificationCard from '../components/NotificationCard';
import { getNotifications } from '../store/rootReducer';

class NotificationCardContainer extends Component {
  render() {
    return (
      <NotificationCard notification={this.props.notification}/>
    );
  }
}

const mapStateToProps = (state) => {
  const notifications = getNotifications(state);
  console.log('notifications', notifications);
  const notification = notifications.length > 0 ? notifications[0] : {};
  return {
    notification,
  }
}

export default connect(
  mapStateToProps
)(NotificationCardContainer);

NotificationCardContainer.propTypes = {
  notification: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}
