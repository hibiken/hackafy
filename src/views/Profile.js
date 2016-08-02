import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { userSignOut } from '../actions';
import { getCurrentUser } from '../store/rootReducer';
import { getAvatarUrl } from '../utils/helpers';
import '../styles/Profile.css';

import defaultAvatar from '../images/default-avatar.png';

class Profile extends React.Component {
  render() {
    const { username, avatarUrl } = this.props.currentUser;
    return (
      <div className="Profile__root">
        <div className="row">
          <div className="four columns">
            <div className="Profile__avatar-img-wrapper">
              <img
                src={getAvatarUrl(avatarUrl)}
                className="Profile__avatar-img"
                alt={`${username} profile`}
              />
            </div>
          </div>
          <div className="eight columns">
            <h3>{username}</h3>
            <button><Link to="/profile/edit">Edit Profile</Link></button>
            <button onClick={this.props.userSignOut}>Sign out</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state)
})

export default connect(
  mapStateToProps,
  { userSignOut }
)(Profile);
