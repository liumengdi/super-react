import React from 'react';
import routeNames from './routeNames';
import { Route } from 'react-router-domV5';

const RouterV5 = () => {
  return (
    routeNames.map(route => {
      return (
        <Route
          key={route.name}
          exact
          path={route.path}
          component={route.component}
        />
      );
    })
  );
};

export default RouterV5;