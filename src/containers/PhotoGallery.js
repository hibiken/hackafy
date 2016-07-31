import React from 'react';
import GalleryItem from '../components/GalleryItem';

const fakeData = [
  {
    avatarUrl: 'https://secure.gravatar.com/avatar/7eb8affe35963c36f376f5f1b50d02dc',
    username: 'tommyschess',
    photoUrl: 'https://hd.unsplash.com/photo-1467348733814-f93fc480bec6',
  },
  {
    avatarUrl: 'https://secure.gravatar.com/avatar/7eb8affe35963c36f376f5f1b50d02dc',
    username: 'bennduchano',
    photoUrl: 'https://hd.unsplash.com/photo-1464822759023-fed622ff2c3b',
  },
]

class PhotoGallery extends React.Component {
  render() {
    return (
      <div className="PhotoGallery__root">
        {fakeData.map((item, idx) => (<GalleryItem key={idx} {...item} />))}
      </div>
    );
  }
}

export default PhotoGallery;
