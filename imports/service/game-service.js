import _ from 'lodash';

/* NFL Live Stream game obj
  {
    "hs": 13,             // Home score
    "d": "Wed",           // Weekday of game
    "gsis": 56893,        // ??
    "vs": 20,             // Visitor score
    "eid": 2016083151,    // NFL game id
    "h": "TB",            // Home city
    "ga": "",             // ??
    "rz": -1,             // Redzone enum: -1 none,
    "v": "WAS",           // Visitor city
    "vnn": "Redskins",    // Visitor nickname
    "t": "8:00",          // Game time
    "q": "F",             // Quarter enum: 1-4, F Final, P Pre-game,
    "hnn": "Buccaneers"   // Home nickname
  },
*/

import Game from '../model/game.js';
import Team from '../model/team.js';
import TeamService from '../service/team-service.js';
import SpreadService from './spread-service.js';

export default class GameService {

  constructor() {

  }

  static getGames(games) {

    return _.map(games, game => {
      return GameService._parseGame(game);
    })

  }

  /*

  Game Class Schema:

    nflGameId: Number,
    createdAt: Date,
    home: Team,
    visitor: Team,
    quarter: String,
    time: String,
    redZone: Number

  Team Class Schema:

    city: String,
    nickname: String,
    score: Number

  */

  static _parseGame(game) {

    // returns h/v Team Class objects from service
    let { homeTeam, visitorTeam } = TeamService.getTeams(game);

    // returns Spread Class object
    let spread = SpreadService.getSpread(homeTeam, visitorTeam);

    // returns [String] of winner or winners if tied / spread ties the score
    let winner = GameService._getWinner(homeTeam, visitorTeam, spread);

    return new Game({
      nflGameId: game.eid,
      createdAt: new Date(),
      time: game.t,
      day: game.d,
      quarter: game.q,
      redZone: game.rz,
      home: homeTeam,
      visitor: visitorTeam,
      winner,
      spread
    });

  }

  static _getWinner(homeTeam, visitorTeam, spread) {

    let home = _.clone(homeTeam);
    let visitor = _.clone(visitorTeam);

    if (!_.isEmpty(spread)) {

      // Adjust score of fav team
      if (home.city === spread.fav) {
        home.score += spread.points
      } else if (visitor.city === spread.fav) {
        visitor.score += spread.points
      }

    }

    let winner = null;

    if (home.score === visitor.score) {
      // Tie Game
      winner = [home.city, visitor.city];

    } else if (home.score > visitor.score) {
      // Home Winning
      winner = [home.city];

    } else if (home.score < visitor.score) {
      // Visitor Winning
      winner = [visitor.city];

    }

    return winner;
  }

}