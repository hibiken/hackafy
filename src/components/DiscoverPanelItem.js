import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getAvatarUrl } from '../utils/helpers';
import FollowButtonContainer from '../containers/FollowButtonContainer';
import '../styles/DiscoverPanelItem.css';

const DiscoverPanelItem = (props) => {
  return (
    <div className="DiscoverPanelItem__root" key={props.user.id}>
     <div className="DiscoverPanelItem__user-info-container">
       <div className="DiscoverPanelItem__user-info">
         <img
           src={getAvatarUrl(props.user.avatarUrl)}
           alt={`${props.user.username} avatar`}
           width={30}
           className="DiscoverPanelItem__avatar-image"
         />
         <Link
          to={`/${props.user.username}`}
          className="DiscoverPanelItem__username">
          {props.user.username}
        </Link>
       </div>
       <div className="DiscoverPanelItem__follow-button">
         <FollowButtonContainer userId={props.user.id} />
       </div>
     </div>
    </div>
  );
}

export default DiscoverPanelItem;

DiscoverPanelItem.propTypes = {
  user: PropTypes.object.isRequired,
}
