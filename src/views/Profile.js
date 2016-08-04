import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { userSignOut } from '../actions';
import { getCurrentUser, getCurrentUsersPosts } from '../store/rootReducer';
import { getAvatarUrl } from '../utils/helpers';
import '../styles/Profile.css';

class Profile extends React.Component {
  render() {
    console.log('props.posts', this.props.posts);
    const { username, avatarUrl } = this.props.currentUser;
    return (
      <div className="Profile__root">
        <div className="row Profile__user-info-container">
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
            <h3 className="Profile__username">{username}</h3>
            <button className="Profile__edit-button">
              <Link to="/profile/edit">Edit Profile</Link>
            </button>
            <button onClick={this.props.userSignOut}>Sign out</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
  posts: getCurrentUsersPosts(state),
})

export default connect(
  mapStateToProps,
  { userSignOut }
)(Profile);
