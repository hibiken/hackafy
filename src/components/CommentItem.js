import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import '../styles/CommentItem.css';

class CommentItem extends React.Component {
  renderBody() {
    const words = this.props.body.split(/\s+/);
    return (
      <span>
        {words.map((word, idx) => {
          if (word.indexOf('#') === 0) {
            return (
              <Link
                to={`/explore/tags/${word.substring(1)}`}
                key={idx}
                className="CommentItem__link">
                {` ${word}`}
              </Link>
            );
          } else if (word.indexOf('@') === 0) {
            return (
              <Link
                to={`/${word.substring(1)}`}
                key={idx}
                className="CommentItem__link">
                {` ${word}`}
              </Link>
            )
          } else {
            return ` ${word}`;
          }
        })}
      </span>
    )
  }

  render() {
    const { username } = this.props;
    return (
      <div className="CommentItem__root">
        <strong><Link to={`/${username}`} className="CommentItem__username">{username}</Link></strong> {this.renderBody()}
        {this.props.deletable === true ? <span className="CommentItem__delete-button"><i className="fa fa-times"/></span> : null}
      </div>
    );
  }
}

export default CommentItem;

CommentItem.propTypes = {
  username: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  deletable: PropTypes.bool.isRequired,
};

CommentItem.defaultProps = {
  deletable: false,
};
