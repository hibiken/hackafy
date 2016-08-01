import React from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../store/rootReducer';

class ProfileEdit extends React.Component {
  render() {
    return (
      <div className="ProfileEdit__root">
        Profile Edit
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
});

export default connect(
  mapStateToProps
)(ProfileEdit);
