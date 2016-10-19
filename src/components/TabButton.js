import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
}

const TabButton = (props) => {
  const className = classNames({
    [props.className]: true,
    [`${props.className}--active`]: props.active,
  });
  return (
    <button
      className={className}
      onClick={props.onClick}>
      {props.children}
    </button>
  );
}

TabButton.propTypes = propTypes;

export default TabButton;
