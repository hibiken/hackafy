import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class DiscoverPanelContainer extends Component {
  render() {
    return (
      <div>
        Discover people
      </div>
    )
  }
}

export default connect()(DiscoverPanelContainer)

DiscoverPanelContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
}
