import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';

import Week from '../model/week.js';
import Pick from '../model/pick.js';

import Game from './Game.jsx';

// Picks component
export default class Games extends Component {

  constructor(props) {
    super(props);
  }

  static renderListHeader() {
    return (
      <div className="ui centered grid">
        <div className="grey row">
          <div className="two wide column"></div>
          <div className="four wide column">
            <p>Visitor</p>
          </div>
          <div className="four wide column">
            <p></p>
          </div>
          <div className="four wide column">
            <p>Home</p>
          </div>
          <div className="two wide column"></div>
        </div>
      </div>
    );
  }

  // Returns an array of usernames
  static getUserNameForLabel(users, pickList) {

    if (!users || _.isEmpty(pickList)) {
      return [];
    }

    let usersList = [];

    _.each(pickList, pick => {
      let { username } = _.find(users, { _id: pick.userId });
      if (!_.isNil(username)) {
        usersList.push(username);
      }
    });

    return usersList;

  }

  static renderList(games, picks = [], users) {

    if (_.isNil(games)) {
      return null;
    }

    return (
      <div className="ui middle aligned centered vertically divided grid">
        {
          _.map(games, (game, index) => {

            let gamePicks = _.filter(picks, { nflGameId: game.nflGameId });

            game.visitor.picks = Games.getUserNameForLabel(users, _.filter(gamePicks, { city: game.visitor.city }));
            game.home.picks = Games.getUserNameForLabel(users, _.filter(gamePicks, { city: game.home.city }));

            return <Game game={ game } key={ index } />
          })
        }
      </div>
    );
  }

  render() {

    // Do not render if awaiting subscriptions or user is not logged in
    if (this.props.loading) {
      return null;
    }

    let { week, picks, users } = this.props;

    return (
      <div>
        <div className="ui divider hidden"></div>
        { Games.renderListHeader() }
        <div className="ui divider hidden"></div>
        { Games.renderList(week.games, picks, users) }
      </div>
    );
  }

}
