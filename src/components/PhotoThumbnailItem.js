import React from 'react';
import '../styles/PhotoThumbnailItem.css';
import { getFilterStyle } from '../config/filters';

class PhotoThumbnailItem extends React.Component {
  constructor(props) {
    super(props);
    this.getStyleObject = this._getStyleObject.bind(this);
  }

  _getStyleObject() {
    let filterStyle;
    if (this.props.filterStyle === '') {
      filterStyle = {}
    } else {
      filterStyle = getFilterStyle(JSON.parse(this.props.filterStyle));
    }

    return {
      ...filterStyle,
      backgroundImage: `url(${this.props.avatarUrl})`,
    };
  }

  render() {
    return (
      <div className="PhotoThumbnailItem__root" onClick={this.props.onClick}>
        <div
          style={this.getStyleObject()}
          className={`Profile__photo-image ${this.props.filter}`}
        />
        <div className="PhotoThumbnailItem__overlay">
          <div className="PhotoThumbnailItem__overlay-icons">
            <div className="PhotoThumbnailItem__likes-count">
              <i className="fa fa-heart"/> <span className="PhotoThumbnailItem__count">{this.props.likesCount}</span>
            </div>
            <div className="PhotoThumbnailItem__comments-count">
              <i className="fa fa-comment" /> <span className="PhotoThumbnailItem__count">{this.props.commentsCount}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
PhotoThumbnailItem.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  avatarUrl: React.PropTypes.string.isRequired,
  likesCount: React.PropTypes.number.isRequired,
  commentsCount: React.PropTypes.number.isRequired,
  filter: React.PropTypes.string,
  filterStyle: React.PropTypes.string.isRequired,
};

export default PhotoThumbnailItem;
