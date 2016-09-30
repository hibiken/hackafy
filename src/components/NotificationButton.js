import React, { PropTypes } from 'react';
import '../styles/NotificationButton.css';

const NotificationButton = (props) => {
  if (props.notificationsCount === 0) {
    return (
      <a className="NotificationButton__button" href="#">
        <i className="fa fa-heart-o Header__nav-icon" aria-hidden="true"/>
      </a>
    );
  } else {
    return (
      <a className="NotificationButton__button NotificationButton__button--active" href="#">
        {props.notificationsCount}
      </a>
    );
  }
}

NotificationButton.propTypes = {
  notificationsCount: PropTypes.number.isRequired,
}

NotificationButton.defaultProps = {
  notificationsCount: 0,
}

export default NotificationButton;
