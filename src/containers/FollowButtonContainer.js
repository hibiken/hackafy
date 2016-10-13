import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
  followUser,
  unfollowUser,
} from '../actions';
import { getCurrentUsersFollowingIds } from '../store/rootReducer';

import FollowButton from '../components/FollowButton';

class FollowButtonContainer extends Component {
  render() {
    return (
      <FollowButton
        isFollowing={this.props.isFollowing}
        onFollowClick={() => this.props.followUser(this.props.userId)}
        onUnfollowClick={() => this.props.unfollowUser(this.props.userId)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
 const currentUserFollowingIds = getCurrentUsersFollowingIds(state);
 return {
   isFollowing: (currentUserFollowingIds.indexOf(ownProps.userId) >= 0),
 };
}

export default connect(
  mapStateToProps,
  { followUser, unfollowUser }
)(FollowButtonContainer);

FollowButtonContainer.propTypes = {
  userId: PropTypes.number.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
}
