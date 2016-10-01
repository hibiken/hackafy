import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import createRoutes from '../routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const Root = ({store}) => {
  const routes = createRoutes(store);
  const muiTheme = getMuiTheme({
    palette: {
      primary1Color: '#4c68d7',
    },
  });
  return (
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        {routes}
      </MuiThemeProvider>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root;
