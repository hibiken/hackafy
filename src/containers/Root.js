import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import createRoutes from '../routes';

const Root = ({store}) => {
  const routes = createRoutes(store);
  return (
    <Provider store={store}>
      {routes}
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root;
