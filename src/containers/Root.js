import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import createRoutes from '../routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Root = ({store}) => {
  const routes = createRoutes(store);
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        {routes}
      </MuiThemeProvider>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root;
