import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { getAllPosts, getIsFetchingPosts } from '../store/rootReducer';
import GalleryItem from '../components/GalleryItem';

class PhotoGallery extends React.Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts, isFetching } = this.props;
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
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: getAllPosts(state),
  isFetching: getIsFetchingPosts(state),
});

export default connect(
  mapStateToProps,
  { fetchPosts }
)(PhotoGallery);
