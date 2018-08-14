import React, { Component } from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import mobile from 'is-mobile';
import moment from 'moment';

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

  renderScore(city, score, winner, quarter) {

    let color = 'black';

    if (winner.length === 1 && city === winner[0] && quarter !== 'P') {
      color = 'green';
    }

    return (
      <div className="value">
        <span style={{ color }}>{ score }</span>
      </div>
    );
  }

  renderGameTimeOrQuarter(quarter, time, day, gameClock) {
    if (quarter === 'FINAL') {
      return `${ moment(day, 'MM-DD-YYYY').format('ddd') } ${ moment(time, 'HH:mm:ss').format('h:mma') }`;
    } else {
      return  `${gameClock} ${quarter}`;
    }
  }

  renderPickLabels(quarter, picks, side) {

    if (!Meteor.user()) {
      return null;
    }

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

    if (quarter !== 'FINAL' && !_.isEmpty(picks)) {
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
            { this.renderScore(game.visitor.city, game.visitor.score, game.winner, game.quarter) }
            <div className="label">
              { game.visitor.nickname }
            </div>
          </div>
        </div>
        <div className="four wide column">
          <p className="quarter">{ this.renderGameTimeOrQuarter(game.quarter, game.time, game.day, game.gameClock) }</p>
          <p className="spread">{ this.renderSpread(game.spread) }</p>
        </div>
        <div className="four wide column">
          <div className="ui mini statistic">
            { this.renderScore(game.home.city, game.home.score, game.winner, game.quarter) }
            <div className="label">
              { game.home.nickname }
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
