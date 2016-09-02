import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import MainMenu from './MainMenu.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ui container">
        <div className="main-header">
          <div className="ui clearing basic segment">
            <div className="ui right floated header login" style={{ fontSize: '14px' }}>
              <AccountsUIWrapper />
            </div>
            <h3 className="ui left floated header">
              Footballer
            </h3>
          </div>
        </div>
        <MainMenu />
        <div className="main-content">
          { this.props.mainContent }
        </div>
      </div>
    );
  }

}

export default AppContainer = createContainer(props => {
  // props here will have `main`, passed from the router
  // anything we return from this function will be *added* to it
  return {
    user: Meteor.user(),
  };
}, App);
