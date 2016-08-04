import React, { PropTypes } from 'react';
import { getAvatarUrl, getImageUrl } from '../utils/helpers';

import '../styles/GalleryItem.css';

class GalleryItem extends React.Component {
  render() {
    return (
      <article className="GalleryItem__root">
        <div className="GalleryItem-header">
          <div className="GalleryItem-header__avatar-container">
            <img
              src={getAvatarUrl(this.props.avatarUrl)}
              className="GalleryItem-header__avatar-img"
              alt={`${this.propsusername} profile`}
            />
          </div>
          <div className="GalleryItem-header__metadata-container">
            <strong>{this.props.username}</strong>
          </div>

        </div>
        <div className={`GalleryItem__body ${this.props.filter || ''}`}>
          <img src={getImageUrl(this.props.photoUrl)} role="presentation" />
        </div>
        <div className="GalleryItem__footer">
          <div>
            15 Likes
          </div>
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
