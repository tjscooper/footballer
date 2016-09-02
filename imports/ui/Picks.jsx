import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';

import Week from '../model/week.js';
import Pick from '../model/pick.js';

// Picks component
export default class Picks extends Component {

  constructor(props) {
    super(props);
  }

  static renderGamesList(games) {

    if (_.isNil(games)) {
      return null;
    }

    return _.map(games, (game, index) => {
      return <div className="ui segment" key={ index }><p>{ game.nflGameId }</p></div>;
    });
  }

  render() {

    if (this.props.loading) {
      return null;
    }

    return (
      <div className="ui segments">
        { Picks.renderGamesList(this.props.week.games) }
      </div>
    );
  }

}

export default PicksContainer = createContainer(props => {

  let picks, week;

  let subs = {
    weeks: Meteor.subscribe('weeks'),
    picks: Meteor.subscribe('picks'),
  };

  if (subs.weeks.ready() && subs.picks.ready()) {

    week = Week.find(
      {}, { sort: { createdAt: -1 } }, { limit: 1 }
    ).fetch()[0];

    picks = Pick.find({}).fetch();

  }

  return {
    loading: !subs.weeks.ready() && !subs.picks.ready(),
    week,
    picks,
  };
}, Picks);
