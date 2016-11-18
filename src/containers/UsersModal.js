import React from 'react';
import { connect } from 'react-redux';
import {
  fetchFollowers,
  fetchFollowing,
} from '../actions';
import Modal from 'react-modal';
import UserListItem from '../components/UserListItem';
import Spinner from '../components/Spinner';
import {
  getFollowersByUsername,
  getFollowingByUsername,
  getIsFetchingFollowersFollowing,
  getCurrentUser,
} from '../store/rootReducer';
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
        maxWidth: (this.props.isFetching ? '300px' : '600px'),
        maxHeight: (this.props.isFetching ? '200px' : '80vh'),
        transition: 'all 400ms',
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
            <UserListItem
              key={user.id}
              user={user}
              isCurrentUser={this.props.currentUser.username === user.username}
            />
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
            <UserListItem
              key={user.id}
              user={user}
              isCurrentUser={user.username === this.props.currentUser.username}
            />
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
  }
}

export default connect(
  mapStateToProps,
{
  fetchFollowers,
  fetchFollowing,
}
)(UsersModal);
