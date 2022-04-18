import React from 'react';
import routeNames from './routeNames';
import { Route } from 'react-router-domV5';
import { Switch } from 'react-router-domV5/cjs/react-router-dom.min';

const RouterV5 = () => {
  return (
    <Switch>
      {routeNames.map((route) => {
        return (
          <Route
            key={route.path}
            exact
            path={route.path}
            component={route.component}
          />
        );
      })}
    </Switch>

  );
};

export default RouterV5;
