import React from 'react';
import '../styles/CommentBox.css';

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentBody: '',
    };

    this.onCommentChange = (event) => this.setState({ commentBody: event.target.value });
    this.handleKeyDown = this._handleKeyDown.bind(this);
  }

  _handleKeyDown(event) {
    if (event.which === 13 && this.state.commentBody.trim().length > 0) {
      this.props.onSubmit(this.state.commentBody);
      this.setState({ commentBody: '' });
      this.commentInput.blur();
    }
  }

  render() {
    return (
      <div className="CommentBox__root">
        <input
          className="CommentBox__input"
          type="text"
          placeholder="Add a comment..."
          value={this.state.commentBody}
          onChange={this.onCommentChange}
          onKeyDown={this.handleKeyDown}
          ref={(ref) => {this.commentInput = ref}}
        />
      </div>
    );
  }
}

export default CommentBox;
