import React from 'react';
import logo from '../images/logo.svg';

const MainLayout = (props) => {
  return (
    <div className="main-layout">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>

      <div className="container">
        {props.children}
      </div>
    </div>
  )
}

export default MainLayout;
