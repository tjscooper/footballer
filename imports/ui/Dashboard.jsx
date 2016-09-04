import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';

import HorizontalLineChartContainer from './HorizontalLineChart.jsx';
import GameService from '../service/game-service';

// Dashboard component
class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { week, users } = this.props;

    if (!week || !users) {
      return null;
    }

    return (
      <div>
        <HorizontalLineChartContainer
          week={ week }
          users={ users }
          getWinningCount={ GameService.getWinningCount } />
        <div className="ui divider hidden"></div>
      </div>
    );
  }

}

export default DashboardContainer = createContainer(props => {

  let picks, week, users;

  let subs = {
    weeks: Meteor.subscribe('weeks'),
    picks: Meteor.subscribe('picks'),
    users: Meteor.subscribe('users'),
  };

  if (subs.weeks.ready() && subs.picks.ready() && subs.users.ready()) {

    // Find the latest week
    week = Week.find({}, { sort: { createdAt: -1 } }, { limit: 1 }).fetch()[0];

    if (!_.isNil(week)) {

      // Get a subset of nflGameId's from this week's games
      let gameIds = _.map(week.games, 'nflGameId');

      // Get user picks (must be logged in)
      picks = Pick.find({}, { $in: { nflGameId: gameIds } }).fetch();

      // Add picks to games (for quick styling)
      _.each(week.games, game => {

        let { nflGameId } = game;
        let pick = _.filter(picks, { nflGameId }) || { city: null };

        game.pick = pick;

      });
    }

    users = Meteor.users.find({}).fetch();

  }

  return {
    loading: !subs.weeks.ready() && !subs.picks.ready(),
    week,
    picks,
    users,
  };

}, Dashboard);
