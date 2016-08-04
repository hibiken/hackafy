import React from 'react';
import { Link } from 'react-router';

import '../styles/NewPostButton.css';

class NewPostButton extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick(event) {
    event.preventDefault();
    this.context.router.push('/new-post');
  }
  render() {
    return (
      <button
        onClick={this.onButtonClick}
        className="NewPostButton__root">
        +
      </button>
    );
  }
}

export default NewPostButton
