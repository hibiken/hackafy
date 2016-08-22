import React from 'react';
import '../styles/FollowButton.css';

const FollowButton = (props) => {
  if (props.isFollowing) {
    return (
      <button
        className="FollowButton__root FollowButton--following"
        onClick={props.onUnfollowClick}>
        Following
      </button>
    )
  } else {
    return (
      <button
        className="FollowButton__root"
        onClick={props.onFollowClick}>
        Folllow
      </button>
    )
  }
}

export default FollowButton;
