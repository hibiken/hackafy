import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { userSignOut } from '../actions';

const Profile = (props) => {
  return (
    <div>
      Profile
      <Link to="/">Back to Home</Link>
      <button onClick={props.userSignOut}>Sign out</button>
    </div>
  );
};

export default connect(
  null,
  { userSignOut }
)(Profile);
