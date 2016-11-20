import React from 'react';
import { connect } from 'react-redux';
import {
  fetchPosts,
  likePost,
  dislikePost,
  addComment,
  deleteComment,
  fetchMoreComments,
} from '../actions';
import GalleryItem from '../components/GalleryItem';
import Spinner from '../components/Spinner';
import LikersModalContainer from './LikersModalContainer';
import {
  getAllPosts,
  getIsFetchingPosts,
  getCurrentUsersLikedPostIds,
  getPostsCurrentPage,
  getPostsTotalPages,
  getCurrentUser,
} from '../store/rootReducer';

import '../styles/PhotoGallery.css'


class PhotoGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      likersModalIsOpen: false,
      likersModalPostId: null,
    };
    this.handleScroll = this._handleScroll.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  _handleScroll() {
    const { scrollTop, scrollHeight } = window.document.body;
    const offset = window.innerHeight * 0.8;

    if (scrollHeight - scrollTop <= window.innerHeight + offset && this._shouldFetchPosts()) {
      this.props.fetchPosts();
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  _shouldFetchPosts() {
    const { isFetching, currentPage, totalPages } = this.props;
    return !isFetching && (currentPage === null || currentPage < totalPages);
  }

  openLikersModal = (postId) => {
    this.setState({
      likersModalIsOpen: true,
      likersModalPostId: postId,
    })
  }

  closeLikersModal = () => {
    this.setState({
      likersModalIsOpen: false,
      likersModalPostId: null,
    });
  }

  render() {
    const { posts, isFetching, likedPostIds, currentUser } = this.props;

    return (
      <div className="PhotoGallery__root">
        {posts.map((post, idx) => (
          <GalleryItem
            key={idx}
            {...post}
            onLike={() => this.props.likePost(post.id)}
            onDislike={() => this.props.dislikePost(post.id)}
            liked={likedPostIds.indexOf(post.id) >= 0}
            onCommentSubmit={(commentBody) => this.props.addComment(post.id, commentBody)}
            onCommentDelete={(commentId) => this.props.deleteComment(post.id, commentId)}
            currentUser={currentUser}
            onFetchMoreComments={() => this.props.fetchMoreComments(post.id)}
            onLikersClick={() => this.openLikersModal(post.id)}
          />
        ))}
        {isFetching ? (
          <div className="PhotoGallery__spinner-container">
            <Spinner />
          </div>
        ) : null}
        <LikersModalContainer
          isOpen={this.state.likersModalIsOpen}
          onRequestClose={this.closeLikersModal}
          postId={this.state.likersModalPostId}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: getAllPosts(state),
  isFetching: getIsFetchingPosts(state),
  likedPostIds: getCurrentUsersLikedPostIds(state),
  currentPage: getPostsCurrentPage(state),
  totalPages: getPostsTotalPages(state),
  currentUser: getCurrentUser(state),
});

export default connect(
  mapStateToProps,
  { fetchPosts, likePost, dislikePost, addComment, deleteComment, fetchMoreComments }
)(PhotoGallery);
