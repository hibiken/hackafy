import React from 'react';
import { getAvatarUrl, getImageUrl } from '../utils/helpers';
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

  renderMessage() {
    const { actionType, actor } = this.props.notification;
    switch (actionType) {
      case 'START_FOLLOWING':
        return `${actor.username} started following you`;
      case 'LIKE_POST':
        return `${actor.username} likes your post`;
      default:
        return null;
    }
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
    const { actor } = this.props.notification;
    return (
      <div className="NotificationItem__root" onClick={this.handleItemClick}>
        <div className="NotificationItem__avatar-wrapper">
          <img
            src={getAvatarUrl(actor.avatarUrl)}
            alt={actor.username}
          />
        </div>
        <div>
          {this.renderMessage()}
        </div>
        {this.renderPhoto()}
      </div>
    );
  }
}

export default NotificationItem;
