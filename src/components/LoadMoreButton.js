import React from 'react';
import '../styles/LoadMoreButton.css';

const LoadMoreButton = (props) => {
  if (!props.show) { return null }

  return (
    <div className="LoadMoreButton__root">
      <button
        className="LoadMoreButton__button"
        onClick={props.onClick}>
        Load more
      </button>
    </div>
  );
}

export default LoadMoreButton;
