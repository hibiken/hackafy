import React from 'react';
import '../styles/NewPostButton.css';

class NewPostButton extends React.Component {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        className="NewPostButton__root">
        +
      </button>
    );
  }
}

export default NewPostButton
