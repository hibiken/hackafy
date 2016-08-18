import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Modal from 'react-modal';
import NewPostButton from '../components/NewPostButton';
import Spinner from '../components/Spinner';
import FollowButton from '../components/FollowButton';
import PostModal from '../components/PostModal';
import {
  userSignOut,
  fetchPublicProfile,
  fetchPostsByUsername,
  followUser,
  unfollowUser
} from '../actions';
import {
  getPublicProfileByUsername,
  getPostsByUsername,
  getIsFetchingPublicProfile,
  getCurrentUser,
  getCurrentUsersFollowingIds
} from '../store/rootReducer';
import { getAvatarUrl, getImageUrl, pluralize } from '../utils/helpers';
import '../styles/Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logoutModalIsOpen: false,
      postModalIsOpen: false,
      activePostIndex: null,
    };

    this.openLogoutModal = () => this.setState({ logoutModalIsOpen: true });
    this.closeLogoutModal = () => this.setState({ logoutModalIsOpen: false });
    this.closePostModal = () => this.setState({ postModalIsOpen: false, activePostIndex: null });
    this.onPrevPostClick = this._onPrevPostClick.bind(this);
    this.onNextPostClick = this._onNextPostClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchPublicProfile(this.props.params.username);
    this.props.fetchPostsByUsername(this.props.params.username);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.username !== nextProps.params.username) {
      this.props.fetchPublicProfile(nextProps.params.username);
      this.props.fetchPostsByUsername(nextProps.params.username);
    }
  }

  _openPostModal(index) {
    this.setState({
      postModalIsOpen: true,
      activePostIndex: index,
    });
  }

  renderActionButton() {
    if (this.props.isCurrentUser) {
      return (
        <button className="Profile__edit-button">
          <Link to="/profile/edit">Edit Profile</Link>
        </button>
      );
    } else {
      const { id } = this.props.user;
      return (
        <FollowButton
          isFollowing={this.props.isFollowing}
          onFollowClick={() => this.props.followUser(id)}
          onUnfollowClick={() => this.props.unfollowUser(id)}
        />
      );
    }
  }

  renderMenuButton() {
    if (this.props.isCurrentUser) {
      return (
        <button className="Profile__menu-button" onClick={this.openLogoutModal}>
          <i className="fa fa-ellipsis-h" aria-hidden="true" />
        </button>
      );
    }
  }

  renderLogoutModal() {
    const customStyles = {
      overlay : {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.45)'
      },
      content : {
        position: 'absolute',
        top: '45%',
        left: '50%',
        right: 'initial',
        bottom: 'initial',
        transform: 'translate(-50%, -50%)',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '0px',
      }
    };
    return (
      <Modal
        isOpen={this.state.logoutModalIsOpen}
        onRequestClose={this.closeLogoutModal}
        style={customStyles}>
        <div>
          <button
            className="Profile__modal-button"
            onClick={this.props.userSignOut}>
            Log Out
          </button>
          <button
            className="Profile__modal-button"
              onClick={this.closeLogoutModal}>
              Cancel
          </button>
        </div>
      </Modal>
    );
  }

  _onPrevPostClick() {
    if (this.state.activePostIndex === 0) {
      return false;
    }
    this.setState({
      activePostIndex: this.state.activePostIndex - 1,
    });
  }

  _onNextPostClick() {
    if (this.state.activePostIndex === this.props.posts.length - 1) {
      return false;
    }
    this.setState({
      activePostIndex: this.state.activePostIndex + 1,
    });
  }

  renderPostModal() {
    const { activePostIndex } = this.state;
    const activePost = (activePostIndex === null ? null : this.props.posts[activePostIndex]);
    console.log('activePost', activePost);
    return (
      <PostModal
        isOpen={this.state.postModalIsOpen}
        onRequestClose={this.closePostModal}
        post={activePost}
        onNextClick={this.onNextPostClick}
        onPrevClick={this.onPrevPostClick}
      />
    );
  }

  render() {
    console.log('state',this.state);
    const { isFetching, user, posts } = this.props;
    if (isFetching || !user) {
      return (
        <div className="Profile__spinner-container">
          <Spinner />
        </div>
      );
    }
    const { username, avatarUrl } = this.props.user;
    return (
      <div className="Profile__root container">
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
          <div className="five columns">
            <h3 className="Profile__username">{username}</h3>
            {this.renderActionButton()}
            {this.renderMenuButton()}
            <div className="Profile__stats">
              <div className="Profile__stats-item">
                <span className="Profile__stats-count">{user.postIds.length}</span> {pluralize(user.postIds.length, 'post', 'posts')}
              </div>
              <div className="Profile__stats-item">
                <span className="Profile__stats-count">{user.followersCount}</span> {pluralize(user.followersCount, 'follower', 'followers')}
              </div>
              <div className="Profile__stats-item">
                <span className="Profile__stats-count">{user.followingCount}</span> {pluralize(user.followingCount, 'following', 'following')}
              </div>
            </div>
          </div>
        </div>
        <div className="Profile__photo-gallery">
          {posts.map((post, idx) => (
            <div key={post.id} className="Profile__photo-gallery-item" onClick={() => this._openPostModal(idx)}>
              <div
                style={{backgroundImage: `url(${getImageUrl(post.photoUrl)})`}}
                className={`Profile__photo-image ${post.filter}`}
              />
            </div>
          ))}
        </div>
        <NewPostButton />
        {this.renderLogoutModal()}
        {this.renderPostModal()}
      </div>
    )
  }
}

const mapStateToProps = (state, {params}) => {
  const user = getPublicProfileByUsername(state, params.username);
  const currentUser = getCurrentUser(state);
  const currentUserFollowingIds = getCurrentUsersFollowingIds(state);
  return {
    user,
    posts: getPostsByUsername(state, params.username),
    isFetching: getIsFetchingPublicProfile(state),
    isCurrentUser: (params.username === currentUser.username),
    isFollowing: (currentUserFollowingIds.indexOf(user.id) >= 0),
  }

}

export default connect(
  mapStateToProps,
  {
    userSignOut,
    fetchPublicProfile,
    fetchPostsByUsername,
    followUser,
    unfollowUser
  }
)(Profile);
