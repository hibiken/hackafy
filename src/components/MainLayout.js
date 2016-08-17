import React from 'react';
import Header from '../containers/Header';
import '../styles/MainLayout.css';

const MainLayout = (props) => {
  return (
    <div className="MainLayout__root">
      <Header />

      <div style={{minHeight: '100vh'}}>
        {props.children}
      </div>
    </div>
  )
}

export default MainLayout;
