import React, { Component } from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import mobile from 'is-mobile';

// Pick component
export default class PickGame extends Component {

  constructor(props) {
    super(props);
  }

  renderSpread(spread) {
    if (_.isEmpty(spread)) {
      return `-`;
    }
    return `${ spread.fav } by ${ Math.abs(spread.points) }`;
  }

  renderScore(city, score, winner) {

    let color = 'black';

    if (winner.length === 1 && city === winner[0] && score !== 0) {
      color = 'green';
    }

    return (
      <div className="value">
        <span style={{ color }}>{ score }</span>
      </div>
    );
  }

  renderGameTimeOrQuarter(quarter, time, day) {

    let msg = '';

    switch (quarter) {
      case 'F':
        msg = `Final`;
        break;
      case 'F':
        msg = `Final (OT)`;
        break;
      case 'P':
        msg = `${ day } ${ time }`;
        break;
      case 'H':
        msg = `Half-time`;
        break;
      default:
        msg = `Q ${ quarter }`;
        break;
    }

    return msg;
  }

  renderPickLabels(quarter, picks, side) {

    if (!Meteor.user()) {
      return null;
    }

    let acceptedQuarters = ['1', '2', '3', '4', 'F', 'FO', 'H'];

    let picksText = '';
    let position = side === 'home' ? 'right' : 'left';

    let popupPosition = `top ${ position }`;

    _.each(picks, (pick, index) => {
      picksText += `${ _.upperFirst(pick) }`;
      if (index !== picks.length -1 ) {
        picksText += ', ';
      }
    });

    let containsUserName = (() => {
      return picks.indexOf(Meteor.user().username) > -1 ? true : false;
    });

    if (acceptedQuarters.indexOf(quarter) > -1 && !_.isEmpty(picks)) {
      return (
        <div
          className="ui icon button"
          data-tooltip={ picksText }
          data-position={ popupPosition }
          data-variation="mini"
          style={{ backgroundColor: '#FFFFFF' }}>
            <i className={ classnames({ 'star': containsUserName(), 'star empty': !containsUserName() }, 'icon link') }></i>
        </div>
      );
    }

  }

  render() {

    let { game, index } = this.props;

    return (
      <div className="row">
        <div className="two wide column">
          <span style={{ float: 'left', fontSize: '8px' }}>
            { this.renderPickLabels(game.quarter, game.visitor.picks, 'visitor') }
          </span>
        </div>
        <div className="four wide column">
          <div className="ui mini statistic">
            { this.renderScore(game.visitor.city, game.visitor.score, game.winner) }
            <div className="label">
              { game.visitor.city }
            </div>
          </div>
        </div>
        <div className="four wide column">
          <p className="quarter">{ this.renderGameTimeOrQuarter(game.quarter, game.time, game.day) }</p>
          <p className="spread">{ this.renderSpread(game.spread) }</p>
        </div>
        <div className="four wide column">
          <div className="ui mini statistic">
            { this.renderScore(game.home.city, game.home.score, game.winner) }
            <div className="label">
              { game.home.city }
            </div>
          </div>
        </div>
        <div className="two wide column">
          <span style={{ float: 'right', fontSize: '8px' }}>
            { this.renderPickLabels(game.quarter, game.home.picks, 'home') }
          </span>
        </div>
      </div>
    );
  }

}
