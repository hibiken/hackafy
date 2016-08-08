import React from 'react';
import { getAvatarUrl, getImageUrl } from '../utils/helpers';
import moment from 'moment';
import LikeButton from './LikeButton';
import CommentBox from './CommentBox';

import '../styles/GalleryItem.css';

class GalleryItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showHeartAnimation: false,
    };

    this.onImageDoubleClick = this._onImageDoubleClick.bind(this);
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

  renderLikes() {
    const { likesCount } = this.props;
    if (likesCount > 0) {
      return (
        <div className="GalleryItem__likes">
          {likesCount} {likesCount === 1 ? 'like' : 'likes'}
        </div>
      );
    }
  }

  renderCaption() {
    const { caption, user: { username } } = this.props;
    if (caption) {
      return (
        <div className="GalleryItem__caption">
          <strong>{username}</strong> {caption}
        </div>
      )
    }
  }

  renderComments() {
    return this.props.comments.map(comment => (
      <div key={comment.id} className="GalleryItem__comment">
        <strong>{comment.username}</strong> {comment.body}
      </div>
    ))
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
            <div className="GalleryItem-header__username">{username}</div>
            {address ? (<div className="GalleryItem-header__address">{address}</div>) : null}
          </div>
          <div className="GalleryItem-header__timestamp">
            {moment(createdAt).fromNow()}
          </div>

        </div>
        <div
          onDoubleClick={this.onImageDoubleClick}
          className={`GalleryItem__body ${filter || ''}`}>
          <img src={getImageUrl(photoUrl)} role="presentation" />
          {this.renderHeartAnimation()}
        </div>
        <div className="GalleryItem__footer">
          {this.renderLikes()}

          {this.renderCaption()}
          {this.renderComments()}
          <div>
            <LikeButton
              onLike={this.props.onLike}
              onDislike={this.props.onDislike}
              liked={this.props.liked}
            />
          </div>
          <div>
            <CommentBox
              onSubmit={this.props.onCommentSubmit}
            />
          </div>
        </div>
      </article>
    );
  }
}

export default GalleryItem;
