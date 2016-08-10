import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import NewPostButton from '../components/NewPostButton';
import Spinner from '../components/Spinner';
import { userSignOut, fetchPublicProfile, fetchPostsByUsername } from '../actions';
import {
  getPublicProfileByUsername,
  getPostsByUsername,
  getIsFetchingPublicProfile,
  getCurrentUser
} from '../store/rootReducer';
import { getAvatarUrl, getImageUrl } from '../utils/helpers';
import '../styles/Profile.css';

class Profile extends React.Component {
  componentDidMount() {
    this.props.fetchPublicProfile(this.props.params.username);
    this.props.fetchPostsByUsername(this.props.params.username);
  }

  renderActionButton() {
    if (this.props.isCurrentUser) {
      return (
        <button className="Profile__edit-button">
          <Link to="/profile/edit">Edit Profile</Link>
        </button>
      );
    } else {
      // TODO: implement this feature.
      return (
        <button>
          Follow
        </button>
      );
    }
  }

  render() {
    const { isFetching, user, posts, isCurrentUser } = this.props;
    if (isFetching || !user) {
      return (
        <div className="Profile__spinner-container">
          <Spinner />
        </div>
      );
    }
    const { username, avatarUrl } = this.props.user;
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
            {this.renderActionButton()}
            {isCurrentUser ? (<button onClick={this.props.userSignOut}>Sign out</button>) : null }
          </div>
        </div>
        <div className="Profile__photo-gallery">
          {posts.map(post => (
            <div key={post.id} className="Profile__photo-gallery-item">
              <div
                style={{backgroundImage: `url(${getImageUrl(post.photoUrl)})`}}
                className={`Profile__photo-image ${post.filter}`}
              />
            </div>
          ))}
        </div>
        <NewPostButton />
      </div>
    )
  }
}

const mapStateToProps = (state, {params}) => ({
  user: getPublicProfileByUsername(state, params.username),
  posts: getPostsByUsername(state, params.username),
  isFetching: getIsFetchingPublicProfile(state),
  isCurrentUser: (params.username === getCurrentUser(state).username),
})

export default connect(
  mapStateToProps,
  { userSignOut, fetchPublicProfile, fetchPostsByUsername }
)(Profile);
