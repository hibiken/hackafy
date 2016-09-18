import React from 'react';
import Header from '../containers/Header';
import '../styles/MainLayout.css';

class MainLayout extends React.Component {
  render() {
    return (
      <div className="MainLayout__root">
        <Header location={this.props.location} />
        <div style={{minHeight: '100vh'}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default MainLayout;
