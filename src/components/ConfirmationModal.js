import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import '../styles/ConfirmationModal.css';

const ConfirmationModal = (props) => {
  const customStyles = {
    overlay : {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.45)'
    },
    content : {
      position: 'absolute',
      top: '45%',
      left: '50%',
      right: 'initial',
      bottom: 'initial',
      transform: 'translate(-50%, -50%)',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '0px',
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      contentLabel="ConfirmationModal"
      style={customStyles}>
      <div>
        <button
          className="ConfirmationModal__button"
          onClick={props.onConfirmClick}>
          {props.confirmText}
        </button>
        <button
          className="ConfirmationModal__button"
            onClick={props.onRequestClose}>
            {props.cancelText}
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onConfirmClick: PropTypes.func.isRequired,
  confirmText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
};

ConfirmationModal.defaultProps = {
  cancelText: 'Cancel',
}
