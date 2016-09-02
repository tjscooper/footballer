import _ from 'lodash';

/* NFL Live Stream team related obj properties
  {
    "hs": 13,             // Home score
    "h": "TB",            // Home city
    "hnn": "Buccaneers"   // Home nickname
  },
*/

import Team from '../model/team.js';

export default class TeamService {

  constructor() {

  }

  static getTeams(game) {

    return {
      homeTeam: TeamService._parseTeam(['h', 'hnn', 'hs'], game),
      visitorTeam: TeamService._parseTeam(['v', 'vnn', 'vs'], game)
    };

  }

  static _parseTeam(fields, game) {

    /*
    Team Class Schema:

      city: String,
      nickname: String,
      score: Number

    */

    return new Team({
      city: game[fields[0]],
      nickname: game[fields[1]],
      score: game[fields[2]]
    });

  }

}
