import React from 'react';
import { getAvatarUrl, getImageUrl } from '../utils/helpers';
import moment from 'moment';
import LikeButton from './LikeButton';
import CommentBox from './CommentBox';
import CommentItem from './CommentItem';
import { Link } from 'react-router';
import { getFilterStyle } from '../config/filters';

import '../styles/GalleryItem.css';

class GalleryItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showHeartAnimation: false,
    };

    this.onImageDoubleClick = this._onImageDoubleClick.bind(this);
    this.getFilterStyle = this._getFilterStyle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.liked) {
      this.setState({ showHeartAnimation: false })
    }
  }

  _onImageDoubleClick(event) {
    event.preventDefault();
    if (!this.props.liked) {
      this.props.onLike()
        .then(() => this.setState({ showHeartAnimation: true }));
    }
  }

  _getFilterStyle() {
    if (this.props.filterStyle === '') {
      return {}
    }

    return getFilterStyle(JSON.parse(this.props.filterStyle));
  }

  renderLikes() {
    const { likesCount } = this.props;
    if (likesCount > 0) {
      return (
        <div className="GalleryItem__likes" onClick={this.props.onLikersClick}>
          {likesCount} {likesCount === 1 ? 'like' : 'likes'}
        </div>
      );
    }
  }

  renderCaption() {
    const { caption, user: { username } } = this.props;
    if (caption) {
      return (
        <CommentItem username={username} body={caption} />
      )
    }
  }

  renderViewMoreComments() {
    const { nextPage, currentPage } = this.props.commentPagination;
    if (nextPage !== null) {
      return (
        <div
          className="GalleryItem__fetch-comments-link"
          onClick={this.props.onFetchMoreComments}>
          {currentPage === 1
          ? `View all ${this.props.commentsCount} comments`
          : 'View more comments'}
        </div>
      );
    }
  }

  renderComments() {
    return (
      <div className="GalleryItem__comments">
        {this.props.comments.map(comment => (
          <CommentItem
            key={comment.id}
            username={comment.username}
            body={comment.body}
            deletable={this.props.currentUser.username === comment.username}
            onDelete={() => this.props.onCommentDelete(comment.id)}
          />
        ))}
      </div>
    );
  }

  renderHeartAnimation() {
    if (this.state.showHeartAnimation) {
      return (
        <i className="fa fa-heart GalleryItem__heart-animation-icon" />
      );
    }
  }

  render() {
    const {
      photoUrl,
      createdAt,
      filter,
      address,
      placeId,
      user: {
        username,
        avatarUrl
      }
    } = this.props;

    return (
      <article className="GalleryItem__root">
        <div className="GalleryItem-header">
          <div className="GalleryItem-header__avatar-container">
            <img
              src={getAvatarUrl(avatarUrl)}
              className="GalleryItem-header__avatar-img"
              alt={`${username} profile`}
            />
          </div>
          <div className="GalleryItem-header__metadata-container">
            <div className="GalleryItem-header__username">
              <Link to={`/${username}`}>{username}</Link>
            </div>
            {address ?
            (<div className="GalleryItem-header__address">
              <Link to={`/explore/locations/${placeId}`}>{address}</Link>
            </div>) : null}
          </div>
          <div className="GalleryItem-header__timestamp">
            {moment(createdAt).fromNow()}
          </div>

        </div>
        <div
          onDoubleClick={this.onImageDoubleClick}
          className={`GalleryItem__body ${filter || ''}`}
          style={this.getFilterStyle()}>
          <img src={getImageUrl(photoUrl)} role="presentation" />
          {this.renderHeartAnimation()}
        </div>
        <div className="GalleryItem__footer">
          {this.renderLikes()}

          {this.renderCaption()}
          {this.renderViewMoreComments()}
          {this.renderComments()}
          <div className="GalleryItem__action-box">
            <div className="GalleryItem__like-button">
              <LikeButton
                onLike={this.props.onLike}
                onDislike={this.props.onDislike}
                liked={this.props.liked}
              />
            </div>
            <div className="GalleryItem__comment-box">
              <CommentBox onSubmit={this.props.onCommentSubmit} />
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default GalleryItem;
