import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';

import GamesThisWeekLineChartContainer from './GamesThisWeekLineChart.jsx';
import Games from './Games.jsx';
import GameService from '../service/game-service';
import Pick from '../model/pick.js';

// Dashboard component
class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { week, picks, users } = this.props;

    if (!week || !users) {
      return null;
    }

    return (
      <div className="ui grid">
        <div className="sixteen wide column">
          <h4 className="ui horizontal divider header">
            { `Week ${week.nflWeek}` }
          </h4>
        </div>
        <div className="sixteen wide column">
          <GamesThisWeekLineChartContainer
            week={ week }
            users={ users }
            getWinningCount={ GameService.getWinningCount } />
        </div>
        <div className="sixteen wide column">
          <Games
            week={ week }
            picks={ picks }
            users={ users } />
        </div>
      </div>
    );
  }

}

export default DashboardContainer = createContainer(props => {

  let picks, week, users;

  let subs = {
    weeks: Meteor.subscribe('weeks.last'),
    picks: null,
    users: Meteor.subscribe('users'),
  };

  if (subs.weeks.ready() && subs.users.ready()) {

    // Find the latest week
    const leagueId = '2018-19';
    const excludedSeasonType = 'PRE';
    week = Week.find({ leagueId, seasonType: { $ne: excludedSeasonType } }, { sort: { nflWeek: -1 }, limit: 1 }).fetch()[0];

    if (!_.isNil(week)) {

      week.games = _.orderBy(week.games, game => game.nflGameId);

      // Get a subset of nflGameId's from this week's games
      let gameIds = _.map(week.games, 'nflGameId');

      subs.picks = Meteor.subscribe('picks', gameIds);

      if (subs.picks.ready()) {

        // Get user picks (must be logged in)
        picks = Pick.find({}, { $in: { nflGameId: gameIds } }).fetch();

        // Add picks to games (for quick styling)
        _.each(week.games, game => {

          let { nflGameId } = game;
          let pick = _.filter(picks, { nflGameId }) || { city: null };

          game.pick = pick;

        });

      }

    }

    users = Meteor.users.find({}).fetch();

  }

  return {
    loading: !subs.weeks.ready() && !subs.users.ready(),
    week,
    picks,
    users,
  };

}, Dashboard);
