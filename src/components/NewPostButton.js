import React from 'react';
import { Link } from 'react-router';

import '../styles/NewPostButton.css';

const NewPostButton = (props) => {
  return (
    <button className="NewPostButton__root">
      <Link to="/new-post" className="NewPostButton__link">
        +
      </Link>
    </button>
  );
}

export default NewPostButton
