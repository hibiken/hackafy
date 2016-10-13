import React, { PropTypes } from 'react';
import Spinner from './Spinner';
import DiscoverPanelItem from './DiscoverPanelItem';
import '../styles/DiscoverPanel.css';

const DiscoverPanel = (props) => {
  return (
    <div className="DiscoverPanel__root">
      <div className="DiscoverPanel__header">
        <h2 className="DiscoverPanel__heading">Discover People</h2>
      </div>
      {props.isFetching === true
       ? (<Spinner />)
       : props.users.map(user => (
         <DiscoverPanelItem key={user.id} user={user} />
       ))}
    </div>
  )
}

export default DiscoverPanel;

DiscoverPanel.propTypes = {
  users: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
}
