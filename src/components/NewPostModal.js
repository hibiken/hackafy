import React, { PropTypes, Component } from 'react';
import Modal from 'react-modal';
import NewPostBoard from '../containers/NewPostBoard';

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0,0,0, 0.8)'
  },
  content : {
    position                   : 'absolute',
    top                        : '50%',
    left                       : '50%',
    transform                  : 'translate(-50%, -50%)',
    right                      : 'initial',
    bottom                     : 'initial',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '30px'

  }
}

class NewPostModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        contentLabel="NewPostModal"
        style={customStyles}>
        <NewPostBoard afterSubmit={this.props.onRequestClose} />
      </Modal>
    );
  }
}

NewPostModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
}

export default NewPostModal;
