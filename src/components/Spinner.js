import React from 'react';
import '../styles/Spinner.css';

const Spinner = (props) => {
  return (
    <svg className="Spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
       <circle className="Spinner__path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
  );
}

export default Spinner;
