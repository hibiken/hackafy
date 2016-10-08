import React, { PropTypes } from 'react';
import { getAvatarUrl } from '../utils/helpers';
import '../styles/NotificationCard.css';

const NotificationCard = (props) => {
  console.log('props', props);
  const avatarUrl = (props.notification.actor === undefined) ? null : props.notification.actor.avatarUrl;
  return (
    <div className="NotificationCard__root">
      <div className="NotificationCard__avatar-wrapper">
        <img
          src={getAvatarUrl(avatarUrl)}
          alt={'ken'}
          width={30}
          className="NotificationCard__avatar-image"
        />
      </div>
      <div className="NotificationCard__message-wrapper">
        <span className="fa fa-times NotificationCard__close-button"/>
        <p>Hey you got a new notification!!!</p>
      </div>
    </div>
  );
}

export default NotificationCard;

NotificationCard.propTypes = {
  notification: PropTypes.object.isRequired,
}
