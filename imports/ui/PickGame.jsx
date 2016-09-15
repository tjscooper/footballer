import React, { Component } from 'react';
import _ from 'lodash';
import classnames from 'classnames';

// Pick component
export default class PickGame extends Component {

  constructor(props) {
    super(props);
  }

  renderSpread(spread) {
    return `${ spread.fav } by ${ Math.abs(spread.points) }`;
  }

  static togglePick(selection) {

    Meteor.call('picks.select', selection);

  }

  render() {

    let { game, index } = this.props;

    return (
      <div className="row">
        <div className="column">
          <button
            className={ classnames('ui basic button', { 'positive' : game.visitor.city === game.pick.city, 'disabled': game.quarter !== 'P' }) }
            onClick={ PickGame.togglePick.bind(null, { nflGameId: game.nflGameId, city: game.visitor.city }) }>
              { game.visitor.city }
          </button>
        </div>
        <div className="column">{ this.renderSpread(game.spread) }</div>
        <div className="column">
          <button
            className={ classnames('ui basic button', { 'positive' : game.home.city === game.pick.city, 'disabled': game.quarter !== 'P'  }) }
            onClick={ PickGame.togglePick.bind(null, { nflGameId: game.nflGameId, city: game.home.city }) }>
              { game.home.city }
          </button>
        </div>
      </div>
    );
  }

}
