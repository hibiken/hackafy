import React from 'react';
import Header from '../containers/Header';
import '../styles/MainLayout.css';

const MainLayout = (props) => {
  return (
    <div className="MainLayout__root">
      <Header />

      <div className="container">
        {props.children}
      </div>
    </div>
  )
}

export default MainLayout;
