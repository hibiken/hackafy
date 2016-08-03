import React from 'react';
import '../styles/FilterButton.css';

const FilterButton = (props) => {
  let className = 'FilterButton__button';
  if (props.active) {
    className += ' FilterButton__button--active';
  }
  return (
    <button
      className={className}
      onMouseDown={props.onMouseDown}>
      {props.children}
    </button>
  );
}

export default FilterButton;
