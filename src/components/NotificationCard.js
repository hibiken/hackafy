import React, { PropTypes, Component } from 'react';
import { getAvatarUrl, getNotificationMessage } from '../utils/helpers';
import '../styles/NotificationCard.css';

class NotificationCard extends Component {
  componentDidMount() {
    this.timeoutID = window.setTimeout(() => {
      this.props.onRemove();
    }, 10000);
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeoutID);
  }

  render() {
    const { actionType, actor } = this.props.notification;
    return (
      <div className="NotificationCard__root">
        <div className="NotificationCard__avatar-wrapper">
          <img
            src={getAvatarUrl(actor.avatarUrl)}
            alt={actor.username}
            className="NotificationCard__avatar-image"
          />
        </div>
        <div className="NotificationCard__message-wrapper">
          <span className="fa fa-times NotificationCard__close-button" onClick={this.props.onRemove}/>
          <p>{getNotificationMessage(actionType, actor.username)}</p>
        </div>
      </div>
    );
  }
}

export default NotificationCard;

NotificationCard.propTypes = {
  notification: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
}
