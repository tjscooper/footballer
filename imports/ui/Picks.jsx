import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';

import Week from '../model/week.js';
import Pick from '../model/pick.js';

import PickGame from './PickGame.jsx';

// Picks component
export default class Picks extends Component {

  constructor(props) {
    super(props);
  }

  static renderListHeader() {
    return (
      <div className="ui three column centered grid">
        <div className="grey row">
          <div className="column">
            <p>Visitor</p>
            <p>W - L - T (Streak)</p>
          </div>
          <div className="column">
            <p>Spread</p>
          </div>
          <div className="column">
            <p>Home</p>
            <p>W - L - T (Streak)</p>
          </div>
        </div>
      </div>
    );
  }

  static renderList(games) {

    if (_.isNil(games)) {
      return null;
    }

    return (
      <div className="ui middle aligned three column centered vertically divided relaxed grid">
        {
          _.map(games, (game, index) => {
            return <PickGame game={ game } key={ index } />
          })
        }
      </div>
    );
  }

  render() {

    // Do not render if awaiting subscriptions or user is not logged in
    if (this.props.loading || !this.props.week || !Meteor.user()) {
      return null;
    }

    let { games } = this.props.week;

    return (
      <div>
        <div className="ui divider hidden"></div>
        { Picks.renderListHeader() }
        <div className="ui divider hidden"></div>
        { Picks.renderList(games) }
      </div>
    );
  }

}

export default PicksContainer = createContainer(props => {

  let picks, week, standings;

  let subs = {
    weeks: Meteor.subscribe('weeks.last'),
    picks: Meteor.subscribe('picks'),
    standings: Meteor.subscribe('standings.last')
  };

  if (subs.weeks.ready() && subs.picks.ready() && subs.standings.ready()) {

    // Find the latest week
    week = Week.find({}, { sort: { nflWeek: -1 }, limit: 1 }).fetch()[0];

    if (!_.isNil(week)) {
      // Get a subset of nflGameId's from this week's games
      let gameIds = _.map(week.games, 'nflGameId');

      // Get user picks (must be logged in)
      picks = Pick.find({}, { $in: { nflGameId: gameIds, userId: Meteor.userId() } }).fetch();

      // Get standings
      standings = Standings.find({}).fetch()[0];

      // Add picks to games (for quick styling)
      _.each(week.games, game => {
        let { nflGameId } = game;
        let pick = _.find(picks, { nflGameId, userId: Meteor.userId() }) || { city: null };
        game.pick = pick;
        game.home.record = standings.teams.filter((team) => team.city === game.home.city)[0];
        game.visitor.record = standings.teams.filter((team) => team.city === game.visitor.city)[0];
      });
    }
  }

  return {
    loading: !subs.weeks.ready() && !subs.picks.ready(),
    week,
    picks,
  };
}, Picks);
