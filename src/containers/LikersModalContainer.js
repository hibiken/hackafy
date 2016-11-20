import React, { Component } from 'react';
import { connect } from 'react-redux';
import UsersModal from '../components/UsersModal';
import { fetchLikers } from '../actions';
import {
  getLikersByPostId,
  getLikerPaginationByPostId,
  getCurrentUser,
  getIsFetchingLikers,
} from '../store/rootReducer';

class LikersModalContainer extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen && !this.props.isOpen) {
      this.props.fetchLikers(nextProps.postId)
    }
  }

  shouldFetchLikers = () => {
    const { currentPage, totalPages } = this.props.pagination;
    return !this.props.isFetching && (currentPage === null || currentPage < totalPages);
  }

  handleFetchNextLikers = () => {
    this.props.fetchLikers(this.props.postId);
  }

  render() {
    return (
      <UsersModal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        isFetching={this.props.isFetching}
        users={this.props.likers}
        heading="People who liked this post"
        isCurrentUser={(user) => this.props.currentUser.username === user.username}
        fetchUsers={this.handleFetchNextLikers}
      />
    );
  }
}

const mapStateToProps = (state, {postId}) => ({
  likers: getLikersByPostId(state, postId),
  isFetching: getIsFetchingLikers(state),
  pagination: getLikerPaginationByPostId(state, postId),
  currentUser: getCurrentUser(state),
})

export default connect(
  mapStateToProps, {
  fetchLikers
})(LikersModalContainer);
