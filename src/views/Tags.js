import React from 'react';
import { connect } from 'react-redux';
import { fetchPostsByTagName } from '../actions';
import Spinner from '../components/Spinner';
import PhotoGrid from '../containers/PhotoGrid';
import {
  getPostsByTagName,
  getIsFetchingPosts,
} from '../store/rootReducer';
import '../styles/Tags.css';

class Tags extends React.Component {
  componentDidMount() {
    this.props.fetchPostsByTagName(this.props.params.tagName);
  }

  render() {
    const { posts, isFetching } = this.props;
    if (isFetching || !posts.length) {
      return (
        <div className="Tags__spinner-container">
          <Spinner />
        </div>
      );
    }

    return (
      <div className="Tags__root">
        <div className="container">
          <header className="Tags__header">
            <h3 className="Tags__heading"># {this.props.params.tagName}</h3>
          </header>
          <PhotoGrid posts={posts} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, {params}) => ({
  posts: getPostsByTagName(state, params.tagName),
  isFetching: getIsFetchingPosts(state),
})

export default connect(
  mapStateToProps,
  {fetchPostsByTagName}
)(Tags);
