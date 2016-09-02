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

    // mock proline fav and spread
    let randomFav = Math.floor((Math.random() * 2) + 1) === 1 ? homeTeam.city : visitorTeam.city;
    let randomSpread = -Math.round((Math.random() * 10) + 1).toFixed(1);

    let winner = GameService._getWinner(
      homeTeam,
      visitorTeam,
      { // roughed-in pointspread data
        fav: randomFav,
        spread: randomSpread
      });

    return new Game({
      nflGameId: game.eid,
      createdAt: new Date(),
      time: game.t,
      day: game.d,
      quarter: game.q,
      redZone: game.rz,
      home: homeTeam,
      visitor: visitorTeam,
      winner
    });

  }

  static _getWinner(home, visitor, spread) {

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

    } else {
      // Edge cases
      winner = [];
    }

    return winner;

  }

}
