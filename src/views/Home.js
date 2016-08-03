import React, { Component } from 'react';
import PhotoGallery from '../containers/PhotoGallery';
import NewPostButton from '../components/NewPostButton';

import '../styles/vendors/normalize.css';
import '../styles/vendors/skeleton.css';
import '../styles/Home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <PhotoGallery />
        <NewPostButton />
      </div>
    );
  }
}

export default Home;
