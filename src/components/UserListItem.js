import React, { PropTypes} from 'react';
import { Link } from 'react-router';
import FollowButtonContainer from '../containers/FollowButtonContainer';
import { getAvatarUrl } from '../utils/helpers';

const UserListItem = ({user, isCurrentUser}) => {
  return (
    <div className="UsersModal__list-item">
      <div className="UsersModal__avatar-wrapper">
        <img src={getAvatarUrl(user.avatarUrl)} alt={user.username} />
      </div>
      <div className="UsersModal__user-info">
        <Link to={`/${user.username}`} className="UsersModal__username">{user.username}</Link>
      </div>
      {(isCurrentUser === false) ? (
        <div className="UsersModal__follow-button-wrapper">
          <FollowButtonContainer userId={user.id} />
        </div>
      ): null}
    </div>
  )
}

UserListItem.propTypes = {
  user: PropTypes.object.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
}

export default UserListItem;
