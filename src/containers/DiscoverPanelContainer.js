import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchFollowSuggestions } from '../actions';
import { getAllSuggestions, getIsFetchingSuggestions } from '../store/rootReducer';
import DiscoverPanel from '../components/DiscoverPanel';

class DiscoverPanelContainer extends Component {
  componentDidMount() {
    this.props.fetchFollowSuggestions();
  }

  render() {
    console.log('props', this.props);
    return (
      <DiscoverPanel
        users={this.props.users}
        isFetching={this.props.isFetching}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  users: getAllSuggestions(state),
  isFetching: getIsFetchingSuggestions(state),
})

export default connect(
  mapStateToProps,
  { fetchFollowSuggestions }
)(DiscoverPanelContainer)

DiscoverPanelContainer.propTypes = {
  users: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchFollowSuggestions: PropTypes.func.isRequired,
}
