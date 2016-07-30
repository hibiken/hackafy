import React from 'react';
import Header from './Header';

const MainLayout = (props) => {
  return (
    <div className="main-layout">
      <Header />

      <div className="container">
        {props.children}
      </div>
    </div>
  )
}

export default MainLayout;
