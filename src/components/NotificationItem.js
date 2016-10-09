import React from 'react';
import { getAvatarUrl, getImageUrl, getNotificationMessage } from '../utils/helpers';
import classNames from 'classnames';
import '../styles/NotificationItem.css';

class NotificationItem extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleItemClick = this._handleItemClick.bind(this);
  }

  _handleItemClick(event) {
    event.stopPropagation();
    this.props.touchNotification();
    const { notifiableType, actor } = this.props.notification;
    switch (notifiableType) {
      case 'User':
        this.context.router.push(`/${actor.username}`);
        break;
      case 'Post':
        this.context.router.push(`/`); // FIXME: redirect to post show
        break;
      default:
        return;
    }
    this.props.itemClickCallback(event);
  }

  renderPhoto() {
    const { notifiableType, photoUrl } = this.props.notification;
    if (notifiableType === 'Post') {
      return (
        <div className="NotificationItem__photo-wrapper">
          <img src={getImageUrl(photoUrl)} role="presentation" width={40} />
        </div>
      )
    }
  }

  render() {
    const { actor, readAt, actionType } = this.props.notification;
    const className = classNames({
      'NotificationItem__root': true,
      'NotificationItem__root--unread': !readAt,
    });

    return (
      <div className={className} onClick={this.handleItemClick}>
        <div className="NotificationItem__avatar-wrapper">
          <img
            src={getAvatarUrl(actor.avatarUrl)}
            alt={actor.username}
          />
        </div>
        <div>
          {getNotificationMessage(actionType, actor.username)}
        </div>
        {this.renderPhoto()}
      </div>
    );
  }
}

export default NotificationItem;
