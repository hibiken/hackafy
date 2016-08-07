import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, likePost, dislikePost } from '../actions';
import GalleryItem from '../components/GalleryItem';
import {
  getAllPosts,
  getIsFetchingPosts,
  getCurrentUsersLikedPostIds
} from '../store/rootReducer';


class PhotoGallery extends React.Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts, isFetching, likedPostIds } = this.props;
    console.log('posts', posts);
    console.log('isFetching', isFetching);
    if (isFetching || !posts.length) {
      return (
        <div>Loading ... </div>
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
  { fetchPosts, likePost, dislikePost }
)(PhotoGallery);
