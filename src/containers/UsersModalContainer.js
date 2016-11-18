import React from 'react';
import { connect } from 'react-redux';
import UsersModal from '../components/UsersModal';
import {
  fetchFollowers,
  fetchFollowing,
} from '../actions';
import {
  getFollowersByUsername,
  getFollowingByUsername,
  getIsFetchingFollowersFollowing,
  getCurrentUser,
} from '../store/rootReducer';
import '../styles/UsersModal.css';

class UsersModalContainer extends React.Component {

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

  render() {
    const users = (this.props.usersType === 'followers')
                  ? this.props.followers : this.props.following;
    const heading = (this.props.usersType === 'followers')
                    ? "Followers" : "Following"

    return (
      <UsersModal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        isFetching={this.props.isFetching}
        users={users}
        heading={heading}
        isCurrentUser={(user) => this.props.currentUser.username === user.username}
      />
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
)(UsersModalContainer);
