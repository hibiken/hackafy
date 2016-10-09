import React, { Component } from 'react';
import PhotoGallery from '../containers/PhotoGallery';
import NotificationCardsContainer from '../containers/NotificationCardsContainer';
import NewPostButton from '../components/NewPostButton';

import '../styles/Home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home__root container">
        <PhotoGallery />
        <NotificationCardsContainer />
        <NewPostButton />
      </div>
    );
  }
}

export default Home;
