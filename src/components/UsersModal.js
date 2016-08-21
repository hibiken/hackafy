import React from 'react';
import { connect } from 'react-redux';
import { fetchFollowers, fetchFollowing } from '../actions';
import Modal from 'react-modal';

class UsersModal extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen && !this.props.isOpen) {
      console.log(`fetch ${nextProps.usersType}!!!`);
      switch (nextProps.usersType) {
        case 'followers':
          this.props.fetchFollowers(this.props.username);
          break;
        case 'following':
          this.props.fetchFollowing(this.props.username);
          break;
        default:
          return null;
      }
    }
  }

  getCustomStyles() {
    return {
      overlay : {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
      },
      content : {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'initial',
        bottom: 'initial',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '0px',
        outline: 'none',
        padding: '0px',
        width: '65vw',
      }
    };
  }

  renderModalContent() {
    return (
      <div>
        <h3>Followers</h3>
      </div>
    )
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        style={this.getCustomStyles()}>
        {this.renderModalContent()}
      </Modal>
    );
  }
}

export default connect(null, { fetchFollowers, fetchFollowing })(UsersModal);
