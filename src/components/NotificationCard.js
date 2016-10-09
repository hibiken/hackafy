import React, { PropTypes } from 'react';
import { getAvatarUrl, getNotificationMessage } from '../utils/helpers';
import '../styles/NotificationCard.css';

const NotificationCard = (props) => {
  const { actionType, actor } = props.notification;
  return (
    <div className="NotificationCard__root">
      <div className="NotificationCard__avatar-wrapper">
        <img
          src={getAvatarUrl(actor.avatarUrl)}
          alt={'ken'}
          width={30}
          className="NotificationCard__avatar-image"
        />
      </div>
      <div className="NotificationCard__message-wrapper">
        <span className="fa fa-times NotificationCard__close-button" onClick={props.onRemove}/>
        <p>{getNotificationMessage(actionType, actor.username)}</p>
      </div>
    </div>
  );
}

export default NotificationCard;

NotificationCard.propTypes = {
  notification: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
}
