import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import NFLService from '../service/nfl-service.js';
import ProlineService from '../service/proline-service.js';

// Settings component
export default class Settings extends Component {

  constructor(props) {
    super(props);
  }

  static getScores() {
    NFLService.getScores();
  }

  static getSpreads() {
    ProlineService.getPointSpread();
  }

  render() {
    return (
      <div>
        <div className="ui divider hidden"></div>
        <button
          className={ classnames('ui button') }
          onClick={ Settings.getScores.bind(null) }>
            Get Scores
        </button>
        <hr />
        <button
          className={ classnames('ui button') }
          onClick={ Settings.getSpreads.bind(null) }>
            Get Spreads
        </button>
        <div className="ui divider hidden"></div>
      </div>
    );
  }

}
