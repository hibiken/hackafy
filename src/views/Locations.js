import React from 'react';
import { connect } from 'react-redux';
import {
  fetchPostsByPlaceId,
  likePost,
  dislikePost,
  addComment,
  followUser,
  unfollowUser
} from '../actions';
import {
  getPostsByPlaceId,
  getIsFetchingPosts,
  getCurrentUsersLikedPostIds,
  getCurrentUser,
  getCurrentUsersFollowingIds
} from '../store/rootReducer';
import { getImageUrl } from '../utils/helpers';
import Spinner from '../components/Spinner';
import PostModal from '../components/PostModal';
import PhotoThumbnailItem from '../components/PhotoThumbnailItem';
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import mapStyle from '../config/mapStyle.json';
import '../styles/Locations.css';

class Locations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postModalIsOpen: false,
      activePostIndex: null,
    };

    this.closePostModal = () => this.setState({
      postModalIsOpen: false,
      activePostIndex: null
    });

    this.onPrevPostClick = this._onPrevPostClick.bind(this);
    this.onNextPostClick = this._onNextPostClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchPostsByPlaceId(this.props.params.placeId);
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
    const { posts, isFetching } = this.props;
    if (isFetching || !posts.length) {
      return (
        <div className="Locations__spinner-container">
          <Spinner />
        </div>
      );
    }
    const { latLng, address } = posts[0];
    return (
      <div className="Locations__root">
        <section style={{height: "350px"}}>
          <GoogleMapLoader
            containerElement={
              <div
                {...this.props.containerElementProps}
                style={{
                  height: "100%",
                }}
              />
            }
            googleMapElement={
              <GoogleMap
                ref={(map) => console.log(map)}
                defaultZoom={13}
                defaultCenter={latLng}
                options={{styles: mapStyle}}>
                <Marker
                  position={latLng}
                />
              </GoogleMap>
            }
          />
        </section>

        <div className="container">
          <h3 className="Locations__main-header">{address}</h3>
          <div className="Locations__photo-gallery">
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
  posts: getPostsByPlaceId(state, params.placeId),
  isFetching: getIsFetchingPosts(state),
  likedPostIds: getCurrentUsersLikedPostIds(state),
  currentUserFollowingIds: getCurrentUsersFollowingIds(state),
  currentUser: getCurrentUser(state),
})
export default connect(
  mapStateToProps,
  {
    fetchPostsByPlaceId,
    likePost,
    dislikePost,
    addComment,
    followUser,
    unfollowUser
  }
)(Locations);
