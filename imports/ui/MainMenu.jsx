import React, { Component, PropTypes } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import classnames from 'classnames';
import _ from 'lodash';

// MainMenu component
export default class MainMenu extends Component {

  constructor(props) {
    super(props);
  }

  getActivePath(item) {

    let standardCSS = ['item'];
    let activeCSS = FlowRouter.current().path === item.path ? 'active' : null;

    return classnames(standardCSS, activeCSS);

  }

  getMenuItemIcon(item) {

    let itemCSS = {
      'tasks': item.iconName === 'tasks',
      'star': item.iconName === 'star',
      'child': item.iconName === 'child',
      'cogs': item.iconName === 'cogs'
    };

    return classnames(itemCSS, 'icon');

  }

  render() {
    let isAdmin = Meteor.user() && Meteor.user().username.toLowerCase() === 'tim';

    let menuItems = [
      { title: 'Dashboard', path: '/', iconName: 'tasks' },
      { title: 'Picks', path: '/picks', iconName: 'star' },
      { title: 'Stats', path: '/stats', iconName: 'child' }
    ];

    if (isAdmin) {
      menuItems.push({ title: '', path: '/settings', iconName: 'cogs' });
    }

    return (
      <div className="ui secondary menu">
        {
          menuItems.map((item, index) => {

            // Only show picks menu item when user is logged in
            if (item.title === 'Picks' && !Meteor.user()) {
              return null;
            }

            return (
              <a className={ this.getActivePath(item) } href={ item.path } key={ index }>
                <i className={ this.getMenuItemIcon(item) }></i> { item.title }
              </a>
            );
          })
        }
      </div>
    );
  }
}
