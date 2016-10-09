import React from 'react';
import NewPostBoard from '../containers/NewPostBoard';
import NotificationCardsContainer from '../containers/NotificationCardsContainer';

import '../styles/NewPost.css';

const NewPost = (props) => {
  return (
    <div className="NewPost__root container">
      <div className="row">
        <div className="">
          <NewPostBoard />
        </div>
      </div>
      <NotificationCardsContainer />
    </div>
  );
}

export default NewPost;
