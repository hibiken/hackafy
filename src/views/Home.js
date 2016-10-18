import React, { Component } from 'react';
import PhotoGallery from '../containers/PhotoGallery';
import NotificationCardsContainer from '../containers/NotificationCardsContainer';
import NewPostButton from '../components/NewPostButton';
import NewPostModal from '../components/NewPostModal';

import '../styles/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPostModalIsOpen: false,
    }

    this.openModal = () => this.setState({ newPostModalIsOpen: true });
    this.closeModal = () => this.setState({ newPostModalIsOpen: false });
  }

  render() {
    return (
      <div className="Home__root container">
        <PhotoGallery />
        <NotificationCardsContainer />
        <NewPostButton onClick={this.openModal}/>
        <NewPostModal
          isOpen={this.state.newPostModalIsOpen}
          onRequestClose={this.closeModal}
        />
      </div>
    );
  }
}



export default Home;
