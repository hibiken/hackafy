import React from 'react';
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
                to={`/tags/${word.substring(1)}`}
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
        <strong>{username}</strong> {this.renderBody()}
      </div>
    );
  }
}

export default CommentItem;
