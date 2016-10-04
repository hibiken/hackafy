import React from 'react';
import { connect } from 'react-redux';
import PostModal from '../components/PostModal';
import PhotoThumbnailItem from '../components/PhotoThumbnailItem';
import { getImageUrl } from '../utils/helpers';
import {
  likePost,
  dislikePost,
  addComment,
  followUser,
  unfollowUser
} from '../actions';
import {
  getCurrentUsersLikedPostIds,
  getCurrentUser,
  getCurrentUsersFollowingIds
} from '../store/rootReducer';

class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      PostModalIsOpen: false,
      activePostIndex: null,
    };

    this.closePostModal = () => this.setState({
      postModalIsOpen: false,
      activePostIndex: null
    });

    this.onPrevPostClick = this._onPrevPostClick.bind(this);
    this.onNextPostClick = this._onNextPostClick.bind(this);
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
    if (this.state.activePostIndex === this.props.posts.length - 1) {
      return false;
    }
    this.setState({
      activePostIndex: this.state.activePostIndex + 1,
    });
  }

  renderPostModal() {
    const { activePostIndex } = this.state;
    if (activePostIndex === null) {
      return (
        <PostModal
          isOpen={this.state.postModalIsOpen}
          onRequestClose={this.closePostModal}
          post={false}
        />
      )
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
        onCommentSubmit={(commentBody) => this.props.addComment(activePost.id, commentBody)}
        showFollowButton={this.props.currentUser.username !== activePost.user.username}
        isFollowing={this.props.currentUserFollowingIds.indexOf(activePost.user.id) >= 0}
        onFollowClick={() => this.props.followUser(activePost.user.id)}
        onUnfollowClick={() => this.props.unfollowUser(activePost.user.id)}
      />
    );
  }

  render() {
    const posts = (!this.props.maxCount) ?
                  this.props.posts :
                  this.props.posts.slice(0, this.props.maxCount);
    return (
      <div className="PhotoGrid__root">
        <div className="PhotoGrid__grid-container Locations__photo-gallery">
          {posts.map((post, idx) => (
            <PhotoThumbnailItem
              key={post.id}
              onClick={() => this._openPostModal(idx)}
              avatarUrl={getImageUrl(post.photoUrl)}
              filter={post.filter}
              likesCount={post.likesCount}
              commentsCount={post.commentsCount}
              filterStyle={post.filterStyle}
            />
          ))}
        </div>
        {this.renderPostModal()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  likedPostIds: getCurrentUsersLikedPostIds(state),
  currentUserFollowingIds: getCurrentUsersFollowingIds(state),
  currentUser: getCurrentUser(state),
})

PhotoGrid.propTypes = {
  posts: React.PropTypes.array.isRequired,
  maxCount: React.PropTypes.number,
}

export default connect(
  mapStateToProps,
  {
    likePost,
    dislikePost,
    addComment,
    followUser,
    unfollowUser
  }
)(PhotoGrid);
