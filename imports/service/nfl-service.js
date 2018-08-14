import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import request from 'request';
import _ from 'lodash';

// import { nflData } from '../api/weeks.tests.data.js';
import Week from '../model/week.js';
import GameService from '../service/game-service.js';

export default class NFLService {

  constructor() {}

  static getScores() {
    let random = Random.id();
    let options = {
      url: `https://feeds.nfl.com/feeds-rs/scores.json?random=${random}`,
      json: true
    };
    const baseRequest = request.defaults({
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': true
      }
    })

    request(options, Meteor.bindEnvironment(NFLService._parseScores));

  }

  static _parseScores(error, response, data) {
    if (_.isNil(data)) {
      return;
    }
    const leagueId = '2018-19';
    // Find week
    let week = Week.findOne({ nflWeek: data.week, leagueId, seasonType: data.seasonType });
    // if week !exists, insert week and continue...
    if (!week) {

      let new_week = new Week({
        leagueId: '2018-19',
        nflWeek: data.week,
        seasonType: data.seasonType,
        createdAt: new Date(),
        games: []
      });

      Meteor.call('weeks.insert', new_week);

      week = Week.findOne({ nflWeek: data.week });
    }

    // parse games
    let games = GameService.getGames(data.gameScores);

    // update games in week
    Meteor.call('weeks.update', week, 'games', games);

  }

}
