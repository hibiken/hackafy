import React from 'react';
import '../styles/FilterButton.css';

const FilterButton = (props) => {
  let className = `FilterButton__button ${props.filter}`;
  if (props.active) {
    className += ' FilterButton__button--active';
  }
  return (
    <button
      className={className}
      style={{backgroundImage: `url(${props.imagePath})`}}
      onMouseDown={props.onMouseDown}>
      {props.children}
    </button>
  );
}

export default FilterButton;
