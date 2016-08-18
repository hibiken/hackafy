import React from 'react';
import '../styles/PhotoThumbnailItem.css';

const PhotoThumbnailItem = (props) => {
  return (
    <div className="PhotoThumbnailItem__root" onClick={props.onClick}>
      <div
        style={{backgroundImage: `url(${props.avatarUrl})`}}
        className={`Profile__photo-image ${props.filter}`}
      />
      <div className="PhotoThumbnailItem__overlay">
        <div className="PhotoThumbnailItem__overlay-icons">
          <div className="PhotoThumbnailItem__likes-count">
            <i className="fa fa-heart"/> <span className="PhotoThumbnailItem__count">{props.likesCount}</span>
          </div>
          <div className="PhotoThumbnailItem__comments-count">
            <i className="fa fa-comment" /> <span className="PhotoThumbnailItem__count">{props.commentsCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

PhotoThumbnailItem.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  avatarUrl: React.PropTypes.string.isRequired,
  likesCount: React.PropTypes.number.isRequired,
  commentsCount: React.PropTypes.number.isRequired,
  filter: React.PropTypes.string,
};

export default PhotoThumbnailItem;
