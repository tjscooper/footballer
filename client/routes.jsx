import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import AppContainer from '../imports/ui/App.jsx';
import Dashboard from '../imports/ui/Dashboard.jsx';
import Picks from '../imports/ui/Picks.jsx';
import Odds from '../imports/ui/Odds.jsx';
import Settings from '../imports/ui/Settings.jsx';

const routes = [
  {
    path: '/',
    component: <Dashboard />,
    name: 'dashboard',
  },
  {
    path: '/picks',
    component: <Picks />,
    name: 'picks',
  },
  {
    path: '/odds',
    component: <Odds />,
    name: 'odds',
  },
  {
    path: '/settings',
    component: <Settings />,
    name: 'settings',
  },
];

_.each(routes, (route) => {
  FlowRouter.route(route.path, {
    name: route.name,
    action() {
      mount(AppContainer, {
        mainContent: route.component,
      });
    },
  });
});
