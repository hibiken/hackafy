import React from 'react';
import { Link } from 'react-router';
import '../styles/NotFoundPage.css';

const NotFoundPage = (props) => {
  return (
    <div className="NotFoundPage__container container">
      <h2 className="NotFoundPage__heading">Sorry, this page isn't available</h2>
      <p className="NotFoundPage__message">
        The link you followed may be broken, or the page may have been removed. <Link to="/">Go back to Hackafy home.</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
