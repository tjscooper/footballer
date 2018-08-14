import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';
import StatsGamesWonLineChartContainer from './StatsGamesWonLineChart.jsx';

const StatsGamesWon = new Mongo.Collection('StatsGamesWon');

// Stats component
class Stats extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <StatsGamesWonLineChartContainer
          stats={ this.props.stats } />
      </div>
    );
  }

}

export default StatsContainer = createContainer(props => {

  let stats = [];

  let subs = {
    gamesWon: Meteor.subscribe('stats.games.won', { leagueId: '2017-18' })
  };

  if (subs.gamesWon.ready()) {
    stats = StatsGamesWon.find({}).fetch();
  }

  return {
    loading: !subs.gamesWon.ready(),
    stats
  };

}, Stats);
