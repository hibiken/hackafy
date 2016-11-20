import React, { PropTypes, Component } from 'react';
import Modal from 'react-modal';
import UserListItem from './UserListItem';
import Spinner from './Spinner';

import '../styles/UsersModal.css';

class UsersModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        scrollOffset={20}
        contentLabel="UsersModal"
        handleScrollOffsetZone={this.props.fetchUsers}
        style={this.getCustomStyles()}>
        <div className="UsersModal__following-content">
          <header className="UsersModal__header">
            <h5 className="UsersModal__heading">{this.props.heading}</h5>
          </header>
           <div className="UsersModal__list-container">
            {this.props.users.map(user => (
              <UserListItem
                key={user.id}
                user={user}
                isCurrentUser={this.props.isCurrentUser(user)}
              />
            ))}
           </div>
           {this.props.isFetching === true
            ? (<div className="UsersModal__spinner-container"><Spinner /></div>) : null}
        </div>
      </Modal>
    )
  }

  getCustomStyles() {
    return {
      overlay : {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
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
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        transition: 'all 400ms',
      }
    };
  }
}

UsersModal.propTypes = {
  heading: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isCurrentUser: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
}

export default UsersModal;
