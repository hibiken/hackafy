import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, likePost, dislikePost, addComment } from '../actions';
import GalleryItem from '../components/GalleryItem';
import Spinner from '../components/Spinner';
import {
  getAllPosts,
  getIsFetchingPosts,
  getCurrentUsersLikedPostIds
} from '../store/rootReducer';

import '../styles/PhotoGallery.css'


class PhotoGallery extends React.Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts, isFetching, likedPostIds } = this.props;
    if (isFetching || !posts.length) {
      return (
        <div className="PhotoGallery__spinner-container">
          <Spinner />
        </div>
      );
    }
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
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: getAllPosts(state),
  isFetching: getIsFetchingPosts(state),
  likedPostIds: getCurrentUsersLikedPostIds(state),
});

export default connect(
  mapStateToProps,
  { fetchPosts, likePost, dislikePost, addComment }
)(PhotoGallery);
