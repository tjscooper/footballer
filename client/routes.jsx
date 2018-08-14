import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import AppContainer from '../imports/ui/App.jsx';
import DashboardContainer from '../imports/ui/Dashboard.jsx';
import PicksContainer from '../imports/ui/Picks.jsx';
import Stats from '../imports/ui/Stats.jsx';
import Settings from '../imports/ui/Settings.jsx';

const routes = [
  {
    path: '/',
    component: <DashboardContainer />,
    name: 'dashboard',
  },
  {
    path: '/picks',
    component: <PicksContainer />,
    name: 'picks',
  },
  {
    path: '/stats',
    component: <Stats />,
    name: 'stats',
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
