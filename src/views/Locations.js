import React from 'react';
import { connect } from 'react-redux';
import { fetchPostsByPlaceId } from '../actions';
import { getPostsByPlaceId, getIsFetchingPosts } from '../store/rootReducer';
import { getImageUrl } from '../utils/helpers';
import Spinner from '../components/Spinner';
import '../styles/Locations.css';

class Locations extends React.Component {
  componentDidMount() {
    this.props.fetchPostsByPlaceId(this.props.params.placeId)
  }

  render() {
    const { posts, isFetching } = this.props;
    console.log('isFetching', isFetching);
    console.log('posts', posts);
    if (isFetching || !posts.length) {
      return (
        <div className="Locations__spinner-container">
          <Spinner />
        </div>
      )
    }
    return (
      <div className="Locations__root">
        Location with ID: {this.props.params.placeId}

        <div className="Locations__photo-gallery">
          {posts.map(post => (
            <div key={post.id} className="Locations__photo-gallery-item">
              <div
                style={{backgroundImage: `url(${getImageUrl(post.photoUrl)})`}}
                className={`Locations__photo-image ${post.filter}`}>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, {params}) => ({
  posts: getPostsByPlaceId(state, params.placeId),
  isFetching: getIsFetchingPosts(state),
})
export default connect(
  mapStateToProps,
  {fetchPostsByPlaceId}
)(Locations);
