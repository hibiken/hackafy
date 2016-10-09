import React from 'react';
import { connect } from 'react-redux';
import { fetchPostsByPlaceId } from '../actions';
import {
  getPostsByPlaceId,
  getIsFetchingPosts
} from '../store/rootReducer';
import Spinner from '../components/Spinner';
import PhotoGrid from '../containers/PhotoGrid';
import NotificationCardsContainer from '../containers/NotificationCardsContainer';
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import mapStyle from '../config/mapStyle.json';
import '../styles/Locations.css';

class Locations extends React.Component {
  componentDidMount() {
    this.props.fetchPostsByPlaceId(this.props.params.placeId);
  }

  render() {
    const { posts, isFetching } = this.props;
    if (isFetching || !posts.length) {
      return (
        <div className="Locations__spinner-container">
          <Spinner />
        </div>
      );
    }
    const { latLng, address } = posts[0];
    return (
      <div className="Locations__root">
        <section style={{height: "350px"}}>
          <GoogleMapLoader
            containerElement={
              <div
                {...this.props.containerElementProps}
                style={{
                  height: "100%",
                }}
              />
            }
            googleMapElement={
              <GoogleMap
                ref={(map) => console.log(map)}
                defaultZoom={13}
                defaultCenter={latLng}
                options={{styles: mapStyle}}>
                <Marker
                  position={latLng}
                />
              </GoogleMap>
            }
          />
        </section>

        <div className="container">
          <h3 className="Locations__main-header">{address}</h3>
          <PhotoGrid posts={posts} />
        </div>
        <NotificationCardsContainer />
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
