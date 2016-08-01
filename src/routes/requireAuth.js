import React from 'react';
import { connect } from 'react-redux';
import { getIsSignedIn } from '../store/rootReducer';

const requireAuth = (Component) => {
  class ProtectedComponent extends React.Component {
    static contextTypes = {
      router: React.PropTypes.object.isRequired,
    };

    componentWillMount() {
      if (!this.props.isSignedIn) {
        console.log('user not logged in. Redirecting to signin...');
        this.context.router.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isSignedIn) {
        console.log('user not logged in. Redirecting to signin...')
        this.context.router.push('/signin')
      }
    }

    render() {
      return <Component {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    isSignedIn: getIsSignedIn(state),
  })

  return connect(mapStateToProps)(ProtectedComponent)
}

export default requireAuth
