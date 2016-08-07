import React, { PropTypes } from 'react';
import { getAvatarUrl, getImageUrl } from '../utils/helpers';
import moment from 'moment';

import '../styles/GalleryItem.css';

class GalleryItem extends React.Component {
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
        <div className={`GalleryItem__body ${filter || ''}`}>
          <img src={getImageUrl(photoUrl)} role="presentation" />
        </div>
        <div className="GalleryItem__footer">
          <div className="GalleryItem__likes">
            15 Likes
          </div>
          {this.renderCaption()}
        </div>
      </article>
    );
  }
}

GalleryItem.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
};

export default GalleryItem;
