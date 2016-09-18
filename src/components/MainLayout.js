import React, { PropTypes } from 'react';
import Header from '../containers/Header';
import '../styles/MainLayout.css';

const MainLayout = (props) => {
  return (
    <div className="MainLayout__root">
      <Header location={props.location} />
      <div style={{minHeight: '100vh'}}>
        {props.children}
      </div>
    </div>
  );
}

MainLayout.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
}

export default MainLayout;
