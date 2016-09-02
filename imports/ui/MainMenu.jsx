import React, { Component, PropTypes } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import classnames from 'classnames';

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

  render() {

    let menuItems = [
      { title: 'Dashboard', path: '/' },
      { title: 'Picks', path: '/picks' },
      { title: 'Settings', path: '/settings' },
    ];

    return (
      <div className="ui secondary menu">
        {
          menuItems.map((item, index) => {
            return <a className={ this.getActivePath(item) } href={ item.path } key={ index }>{ item.title }</a>
          })
        }
      </div>
    );
  }
}
