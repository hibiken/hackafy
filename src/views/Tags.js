import React from 'react';
import { connect } from 'react-redux';
import {
  fetchPostsByTagName,
  likePost,
  dislikePost,
  addComment,
  followUser,
  unfollowUser
} from '../actions';
import Spinner from '../components/Spinner';
import PhotoThumbnailItem from '../components/PhotoThumbnailItem';
import PostModal from '../components/PostModal';
import { getImageUrl } from '../utils/helpers';
import {
  getPostsByTagName,
  getIsFetchingPosts,
  getCurrentUsersLikedPostIds,
  getCurrentUsersFollowingIds,
  getCurrentUser
} from '../store/rootReducer';
import '../styles/Tags.css';

class Tags extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postModalIsOpen: false,
      activePostIndex: null,
    };

    this.closePostModal = () => this.setState({
      postModalIsOpen: false,
      activePostIndex: null,
    });

    this.onPrevPostClick = this._onPrevPostClick.bind(this);
    this.onNextPostClick = this._onNextPostClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchPostsByTagName(this.props.params.tagName);
  }

  _openPostModal(index) {
    this.setState({
      postModalIsOpen: true,
      activePostIndex: index,
    });
  }

  _onPrevPostClick() {
    if (this.state.activePostIndex === 0) {
      return false;
    }
    this.setState({
      activePostIndex: this.state.activePostIndex - 1,
    });
  }

  _onNextPostClick() {
    if (this.state.activePostIndex === this.props.posts.length -1) {
      return false;
    }
    this.setState({
      activePostIndex: this.state.activePostIndex + 1,
    });
  }

  // TODO: DRY up this. Repeated in Locations view too.
  renderPostModal() {
    const { activePostIndex } = this.state;
    if (activePostIndex === null) {
      return (
        <PostModal
          isOpen={this.state.postModalIsOpen}
          onRequestClose={this.closePostModal}
          post={false}
        />
      );
    }
    const activePost = this.props.posts[activePostIndex];
    return (
      <PostModal
        isOpen={this.state.postModalIsOpen}
        onRequestClose={this.closePostModal}
        post={activePost}
        onNextClick={this.onNextPostClick}
        onPrevClick={this.onPrevPostClick}
        onLike={() => this.props.likePost(activePost.id)}
        onDislike={() => this.props.dislikePost(activePost.id)}
        liked={this.props.likedPostIds.indexOf(activePost.id) >= 0}
        onCommentSubmit={commentBody => this.props.addComment(activePost.id, commentBody)}
        showFollowButton={this.props.currentUser.username !== activePost.user.username}
        isFollowing={this.props.currentUserFollowingIds.indexOf(activePost.user.id) >= 0}
        onFollowClick={() => this.props.followUser(activePost.user.id)}
        onUnfollowClick={() => this.props.unfollowUser(activePost.user.id)}
      />
    )
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
          <div className="Tags__photo-gallery">
            {posts.map((post, idx) => (
              <PhotoThumbnailItem
                key={post.id}
                onClick={() => this._openPostModal(idx)}
                avatarUrl={getImageUrl(post.photoUrl)}
                filter={post.filter}
                likesCount={post.likesCount}
                commentsCount={post.comments.length}
              />
            ))}
          </div>

        </div>
        {this.renderPostModal()}
      </div>
    );
  }
}

const mapStateToProps = (state, {params}) => ({
  posts: getPostsByTagName(state, params.tagName),
  isFetching: getIsFetchingPosts(state),
  likedPostIds: getCurrentUsersLikedPostIds(state),
  currentUserFollowingIds: getCurrentUsersFollowingIds(state),
  currentUser: getCurrentUser(state),
})

export default connect(
  mapStateToProps,
  {
    fetchPostsByTagName,
    likePost,
    dislikePost,
    addComment,
    followUser,
    unfollowUser
  }
)(Tags);
