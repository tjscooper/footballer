import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// Dashboard component
class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Dashboard<br />
        Dashboard<br />
        Dashboard<br />
        Dashboard<br />
        Dashboard<br />
      </div>
    );
  }

}

export default DashboardContainer = createContainer(props => {

  let sample = 'sample';

  return {
    sample
  };
}, Dashboard);
