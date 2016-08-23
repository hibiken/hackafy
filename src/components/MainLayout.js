import React from 'react';
import { connect } from 'react-redux';
import Header from '../containers/Header';
import { fetchNotificationCount } from '../actions';
import { getNotificationCount } from'../store/rootReducer';
import '../styles/MainLayout.css';

class MainLayout extends React.Component {
  componentDidMount() {
    this.props.fetchNotificationCount();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.fetchNotificationCount();
    }
  }

  render() {
    return (
      <div className="MainLayout__root">
        <Header notificationCount={this.props.notificationCount} />

        <div style={{minHeight: '100vh'}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notificationCount: getNotificationCount(state),
});

export default connect(
  mapStateToProps,
  { fetchNotificationCount }
)(MainLayout);
