import React, { PropTypes } from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import '../styles/MainLayout.css';

const MainLayout = (props) => {
  return (
    <div className="MainLayout__root">
      <HeaderContainer location={props.location} />
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
