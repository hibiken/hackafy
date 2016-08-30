import React from 'react';
import '../styles/ErrorMessages.css';

const ErrorMessages = (props) => {
  if (!props.messages.length) {
    return null;
  }
  return (
    <div className="ErrorMessages__root">
      {props.messages.map((msg, idx) => (
        <div
          key={idx}
          className="ErrorMessages__item">
          {msg}
        </div>
      ))}
    </div>
  );
}

ErrorMessages.propTypes = {
  messages: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export default ErrorMessages;
