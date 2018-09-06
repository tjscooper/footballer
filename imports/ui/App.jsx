import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import MainMenu from './MainMenu.jsx';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ui container">
        <div className="main-header">
          <div className="ui clearing basic segment">
            <div className="ui right header" style={{ fontSize: '16px' }}>
              <i className="trophy icon"></i> Footballer
            </div>
            <h3 className="ui left floated header">
              <LoginButtons />
            </h3>
          </div>
        </div>
        <MainMenu />
        <div className="main-content">
          { this.props.mainContent }
        </div>
        <div className="ui vertical footer segment">
          <div className="ui stackable divided equal height stackable grid">
            <div className="column">
              <h4 className="ui header">Footballer Disclaimer: Notice of Intent</h4>
              <p>This app was created purely for educational purposes. The developer does not claim any IP for the body of work known as, "footballer". The data stored, obtained, and used herein is not used for personal or commercial monetary gain in any way, shape or form.</p>
              <p>Any comments or concerns relative to this application should be directed to <a href="mailto:footballer.app@gmail.com">footballer.app@gmail.com</a></p>
              <p>The developer of this application reserves the right to discontinue hosting / cease operation of footballer upon recieving reasonable concern without penalties or legal action.</p>
            </div>
          </div>
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
