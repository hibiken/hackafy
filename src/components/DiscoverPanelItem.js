import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getAvatarUrl, getImageUrl } from '../utils/helpers';
import { getFilterStyle } from '../config/filters';
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
     <div className="DiscoverPanelItem__posts-container">
      {props.user.posts.length === 0
       ? (<div className="DiscoverPanelItem__no-posts">
            <div>No posts yet.</div>
          </div>)
       : (
         <div className="DiscoverPanelItem__photo-container">
           {props.user.posts.map(post => (
            <div
              key={post.id}
              className={`${post.filter} DiscoverPanelItem__photo-item--filter`}>
              <div
                style={{
                  ...getFilterStyle(post.filterStyle),
                  backgroundImage: `url(${getImageUrl(post.photoUrl)})`
                }}
                className="DiscoverPanelItem__photo-item"
                >
              </div>
            </div>
           ))}
         </div>
       )}

     </div>
    </div>
  );
}

export default DiscoverPanelItem;

DiscoverPanelItem.propTypes = {
  user: PropTypes.object.isRequired,
}
