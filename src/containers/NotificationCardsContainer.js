import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import NotificationCard from '../components/NotificationCard';
import { getNewNotifications } from '../store/rootReducer';
import { hideNewNotification } from '../actions';

class NotificationCardsContainer extends Component {
  render() {
    if (this.props.notifications.length === 0) {
      return null;
    }
    return (
      <div className="NotificationCardsContainer__root">
        {this.props.notifications.map(notification => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onRemove={() => this.props.hideNewNotification(notification.id)}
          />
        ))}
      </div>
    )

  }
}

const mapStateToProps = (state) => ({
  notifications: getNewNotifications(state),
})

export default connect(
  mapStateToProps,
  { hideNewNotification }
)(NotificationCardsContainer);

NotificationCardsContainer.propTypes = {
  notifications: PropTypes.array.isRequired,
  hideNewNotification: PropTypes.func.isRequired,
}
