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
  getFollowerPaginationByUsername,
  getFollowingPaginationByUsername,
} from '../store/rootReducer';

class UsersModalContainer extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen && !this.props.isOpen) {
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

  shouldFetchFollowers = () => {
    const { currentPage, totalPages } = this.props.followerPagination;
    return !this.props.isFetching && (currentPage === null || currentPage < totalPages);
  }

  shouldFetchFollowing = () => {
    const { currentPage, totalPages } = this.props.followingPagination;
    return !this.props.isFetching && (currentPage === null || currentPage < totalPages);
  }

  handleFetchNextFollowers = () => {
    if (this.shouldFetchFollowers()) {
      this.props.fetchFollowers(this.props.username);
    }
  }

  handleFetchNextFollowing = () => {
    if (this.shouldFetchFollowing()) {
      this.props.fetchFollowing(this.props.username);
    }
  }

  render() {
    const users = (this.props.usersType === 'followers')
                  ? this.props.followers : this.props.following;
    const heading = (this.props.usersType === 'followers')
                    ? "Followers" : "Following"
    const fetchUsers = (this.props.usersType === 'followers')
                       ? this.handleFetchNextFollowers : this.handleFetchNextFollowing;

    return (
      <UsersModal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        isFetching={this.props.isFetching}
        users={users}
        heading={heading}
        isCurrentUser={(user) => this.props.currentUser.username === user.username}
        fetchUsers={fetchUsers}
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
    followerPagination: getFollowerPaginationByUsername(state, username),
    followingPagination: getFollowingPaginationByUsername(state, username),
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
