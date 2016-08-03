import React from 'react';
import NewPostBoard from '../containers/NewPostBoard';

import '../styles/NewPost.css';

const NewPost = (props) => {
  return (
    <div className="NewPost__root">
      <div className="row">
        <div className="six columns offset-by-three">
          <NewPostBoard />
        </div>
      </div>
    </div>
  );
}

export default NewPost;
