import React, { PropTypes } from 'react';
import  { connect } from 'react-redux';
import {
  getIsSignedIn,
  getCurrentUser,
} from '../store/rootReducer';
import Header from '../components/Header';

const HeaderContainer = (props) => {
  return (
    <Header
      isSignedIn={props.isSignedIn}
      location={props.location}
      currentUser={props.currentUser}
    />
  );
}

HeaderContainer.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isSignedIn: getIsSignedIn(state),
  currentUser: getCurrentUser(state),
});

export default connect(
  mapStateToProps
)(Header);
