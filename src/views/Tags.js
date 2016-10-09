import React from 'react';
import { connect } from 'react-redux';
import { fetchPostsByTagName } from '../actions';
import LoadMoreButton from '../components/LoadMoreButton';
import PhotoGrid from '../containers/PhotoGrid';
import NotificationCardsContainer from '../containers/NotificationCardsContainer';
import {
  getPostsByTagName,
  getIsFetchingPosts,
  getPaginationByTagName,
} from '../store/rootReducer';
import { pluralize } from '../utils/helpers';
import '../styles/Tags.css';

class Tags extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      infinteScrollEnabled: false,
    };

    this.enableInfiniteScroll = this._enableinfiniteScroll.bind(this);
    this.handleScroll = this._handleScroll.bind(this);
  }

  componentDidMount() {
    this.props.fetchPostsByTagName(this.props.params.tagName);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  _handleScroll() {
    const { scrollTop, scrollHeight } = window.document.body;
    const offset = window.innerHeight * 0.8;

    if (scrollHeight - scrollTop <= window.innerHeight + offset && this._shouldFetchPosts()) {
      this.props.fetchPostsByTagName(this.props.params.tagName);
    }
  }

  _shouldFetchPosts() {
    const { isFetching, pagination: { currentPage, totalPages } } = this.props;
    return (
      this.state.infinteScrollEnabled &&
      (!isFetching && (currentPage === null || currentPage < totalPages))
    );
  }

  _enableinfiniteScroll(event) {
    event.preventDefault();
    this.setState({ infinteScrollEnabled: true });
  }

  render() {
    const { posts, pagination } = this.props;
    return (
      <div className="Tags__root">
        <div className="container">
          <header className="Tags__header">
            <h3 className="Tags__heading"># {this.props.params.tagName}</h3>
            <h5 className="Tags_subheading">
              {pagination.totalCount} {pluralize(pagination.totalCount, 'post', 'posts')}
            </h5>
          </header>
          <PhotoGrid
            posts={posts}
            maxCount={this.state.infinteScrollEnabled ? null : 9}
           />
           <LoadMoreButton
            show={pagination.nextPage && !this.state.infinteScrollEnabled}
            onClick={this.enableInfiniteScroll}
           />
        </div>
        <NotificationCardsContainer />
      </div>
    );
  }
}

const mapStateToProps = (state, {params}) => ({
  posts: getPostsByTagName(state, params.tagName),
  isFetching: getIsFetchingPosts(state),
  pagination: getPaginationByTagName(state, params.tagName),
})

export default connect(
  mapStateToProps,
  {fetchPostsByTagName}
)(Tags);
