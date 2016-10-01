import React from 'react';
import NewPostBoard from '../containers/NewPostBoard';

import '../styles/NewPost.css';

const NewPost = (props) => {
  return (
    <div className="NewPost__root container">
      <div className="row">
        <div className="">
          <NewPostBoard />
        </div>
      </div>
    </div>
  );
}

export default NewPost;
