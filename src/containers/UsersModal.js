import React from 'react';
import { connect } from 'react-redux';
import {
  fetchFollowers,
  fetchFollowing,
  followUser,
  unfollowUser
} from '../actions';
import Modal from 'react-modal';
import { Link } from 'react-router';
import FollowButton from '../components/FollowButton';
import Spinner from '../components/Spinner';
import {
  getFollowersByUsername,
  getFollowingByUsername,
  getIsFetchingFollowersFollowing,
  getCurrentUser,
  getCurrentUsersFollowingIds
} from '../store/rootReducer';
import { getAvatarUrl } from '../utils/helpers';
import '../styles/UsersModal.css';

class UsersModal extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen && !this.props.isOpen) {
      console.log(`fetch ${nextProps.usersType}!!!`);
      switch (nextProps.usersType) {
        case 'followers':
          this.props.fetchFollowers(this.props.username);
          break;
        case 'following':
          this.props.fetchFollowing(this.props.username);
          break;
        default:
          return null;
      }
    }
  }

  getCustomStyles() {
    return {
      overlay : {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
      },
      content : {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'initial',
        bottom: 'initial',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '0px',
        outline: 'none',
        padding: '0px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
      }
    };
  }

  _getFollowersModalContent() {
    const { isFetching, followers } = this.props;
    if (isFetching || !followers.length) {
      return (
        <div className="UsersModal__followers">
          <header className="UsersModal__header">
            <h5 className="UsersModal__heading">Followers</h5>
          </header>
          <div className="UsersModal__spinner-container">
            <Spinner />
          </div>
        </div>
      );
    }

    return (
      <div className="UsersModal__followers">
        <header className="UsersModal__header">
          <h5 className="UsersModal__heading">Followers</h5>
        </header>
        <div className="UsersModal__list-container">
          {followers.map(user => (
            <div key={user.id} className="UsersModal__list-item">
              <div className="UsersModal__avatar-wrapper">
                <img src={getAvatarUrl(user.avatarUrl)} alt={user.username} />
              </div>
              <div className="UsersModal__user-info">
                <Link to={`/${user.username}`} className="UsersModal__username">{user.username}</Link>
              </div>
              {this.renderFollowButton(user)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  _getFollowingModalContent() {
    const { isFetching, following } = this.props;
    if (isFetching || !following.length) {
      return (
        <div className="UsersModal__following-content">
          <header className="UsersModal__header">
            <h5 className="UsersModal__heading">Following</h5>
          </header>
          <div className="UsersModal__spinner-container">
            <Spinner />
          </div>
        </div>
      );
    }

    return (
      <div className="UsersModal__following-content">
        <header className="UsersModal__header">
          <h5 className="UsersModal__heading">Following</h5>
        </header>
        <div className="UsersModal__list-container">
          {following.map(user => (
            <div key={user.id} className="UsersModal__list-item">
              <div className="UsersModal__avatar-wrapper">
                <img src={getAvatarUrl(user.avatarUrl)} alt={user.username} />
              </div>
              <div className="UsersModal__user-info">
                <Link to={`/${user.username}`} className="UsersModal__username">{user.username}</Link>
              </div>
              {this.renderFollowButton(user)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  renderModalContent() {
    if (this.props.usersType === 'followers') {
      return this._getFollowersModalContent();
    }

    if (this.props.usersType === 'following') {
      return this._getFollowingModalContent();
    }
  }

  renderFollowButton(user) {
    if (user.username !== this.props.currentUser.username) {
      const { currentUserFollowingIds } = this.props;
      return (
        <div className="UsersModal__follow-button-wrapper">
          <FollowButton
            isFollowing={currentUserFollowingIds.indexOf(user.id) >= 0}
            onFollowClick={() => this.props.followUser(user.id)}
            onUnfollowClick={() => this.props.unfollowUser(user.id)}
          />
        </div>
      )
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        style={this.getCustomStyles()}>
        {this.renderModalContent()}
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { username } = ownProps;
  return {
    followers: getFollowersByUsername(state, username),
    following: getFollowingByUsername(state, username),
    isFetching: getIsFetchingFollowersFollowing(state),
    currentUser: getCurrentUser(state),
    currentUserFollowingIds: getCurrentUsersFollowingIds(state),
  }
}

export default connect(
  mapStateToProps,
{
  fetchFollowers,
  fetchFollowing,
  followUser,
  unfollowUser
}
)(UsersModal);
