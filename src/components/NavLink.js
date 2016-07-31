import React from 'react';
import { Link } from 'react-router';

const NavLink = (props) => (<Link {...props} activeClassName="NavLink--active" />);

export default NavLink;
