import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import NewPostButton from '../components/NewPostButton';
import NewPostModal from '../components/NewPostModal';
import Spinner from '../components/Spinner';
import FollowButton from '../components/FollowButton';
import LoadMoreButton from '../components/LoadMoreButton';
import ConfirmationModal from '../components/ConfirmationModal';
import UsersModalContainer from '../containers/UsersModalContainer';
import PhotoGrid from '../containers/PhotoGrid';
import NotificationCardsContainer from '../containers/NotificationCardsContainer';
import NotFoundPage from './NotFoundPage';
import {
  userSignOut,
  fetchPublicProfile,
  fetchPostsByUsername,
  followUser,
  unfollowUser,
} from '../actions';
import {
  getPublicProfileByUsername,
  getPostsByUsername,
  getIsFetchingPublicProfile,
  getPublicProfileErrors,
  getCurrentUser,
  getCurrentUsersFollowingIds,
  getIsFetchingPosts,
  getPaginationByUsername
} from '../store/rootReducer';
import { getAvatarUrl, pluralize } from '../utils/helpers';
import '../styles/Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logoutModalIsOpen: false,
      usersModalIsOpen: false,
      newPostModalIsOpen: false,
      modalUserType: null,
      endlessScroll: false,
    };

    this.openLogoutModal = () => this.setState({ logoutModalIsOpen: true });
    this.closeLogoutModal = () => this.setState({ logoutModalIsOpen: false });
    this.closeUsersModal = () => this.setState({ usersModalIsOpen: false });
    this.openNewPostModal = () => this.setState({ newPostModalIsOpen: true });
    this.closeNewPostModal = () => this.setState({ newPostModalIsOpen: false });
    this.enableEndlessScroll = this._enableEndlessScroll.bind(this);
    this.handleScroll = this._handleScroll.bind(this);
    this.resetState = () => this.setState({
      logoutModalIsOpen: false,
      postModalIsOpen: false,
      usersModalIsOpen: false,
      activePostIndex: null,
      modalUserType: null,
      endlessScroll: false,
    });
  }

  componentDidMount() {
    this.props.fetchPublicProfile(this.props.params.username);
    this.props.fetchPostsByUsername(this.props.params.username);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.username !== nextProps.params.username) {
      this.props.fetchPublicProfile(nextProps.params.username);
      this.props.fetchPostsByUsername(nextProps.params.username);
      this.resetState();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  _enableEndlessScroll(event) {
    event.preventDefault();
    this.props.fetchPostsByUsername(this.props.params.username);
    this.setState({ endlessScroll: true });
  }

  _openUsersModal(modalUserType) {
    this.setState({
      usersModalIsOpen: true,
      modalUserType,
    });
  }

  _handleScroll() {
    const { scrollTop, scrollHeight } = window.document.body;
    const offset = window.innerHeight * 0.8;

    if (scrollHeight - scrollTop <= window.innerHeight + offset && this._shouldFetchPosts()) {
      this.props.fetchPostsByUsername(this.props.params.username);
    }
  }

  _shouldFetchPosts() {
    const { isFetchingPosts, pagination: { currentPage, totalPages } } = this.props;
    return (
      this.state.endlessScroll &&
      (!isFetchingPosts && (currentPage === null || currentPage < totalPages))
    );
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

  renderUsersModal() {
    return (
      <UsersModalContainer
        isOpen={this.state.usersModalIsOpen}
        onRequestClose={this.closeUsersModal}
        username={this.props.params.username}
        usersType={this.state.modalUserType}
      />
    )
  }

  render() {
    const { isFetching, user, errors } = this.props;

    if (isFetching === false && errors.length > 0) {
      return (<NotFoundPage />);
    }

    if (isFetching || !user) {
      return (
        <div className="Profile__spinner-container">
          <Spinner />
        </div>
      );
    }


    const { username, avatarUrl } = this.props.user;
    console.log('this.props',this.props);
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
              <div
                className="Profile__stats-item Profile__stats-item--link"
                onClick={() => this._openUsersModal('followers')}>
                <span className="Profile__stats-count">{user.followersCount}</span> {pluralize(user.followersCount, 'follower', 'followers')}
              </div>
              <div
                className="Profile__stats-item Profile__stats-item--link"
                onClick={() => this._openUsersModal('following')}>
                <span className="Profile__stats-count">{user.followingCount}</span> {pluralize(user.followingCount, 'following', 'following')}
              </div>
            </div>
          </div>
        </div>
        <PhotoGrid
          posts={this.props.posts}
          maxCount={(this.state.endlessScroll ? null : 9)}
        />
        <LoadMoreButton
          show={this.props.pagination.nextPage && !this.state.endlessScroll}
          onClick={this.enableEndlessScroll}
        />
        <NotificationCardsContainer />
        <NewPostButton onClick={this.openNewPostModal}/>
        <NewPostModal
          isOpen={this.state.newPostModalIsOpen}
          onRequestClose={this.closeNewPostModal}
        />
        <ConfirmationModal
          isOpen={this.state.logoutModalIsOpen}
          onRequestClose={this.closeLogoutModal}
          onConfirmClick={this.props.userSignOut}
          confirmText="Log out"
        />
        {this.renderUsersModal()}
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
    isFetchingPosts: getIsFetchingPosts(state),
    pagination: getPaginationByUsername(state, params.username),
    errors: getPublicProfileErrors(state),
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
