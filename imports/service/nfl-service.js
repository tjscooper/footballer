import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import request from 'request';
import _ from 'lodash';

// import { nflData } from '../api/weeks.tests.data.js';
import Week from '../model/week.js';
import GameService from '../service/game-service.js';

export default class NFLService {

  constructor() {

  }

  static getScores() {

    console.log("Getting scores...", new Date());

    let random = Random.id();

    let options = {
      url: `http://www.nfl.com/liveupdate/scorestrip/ss.json?random=${random}`,
      json: true
    };

    request(options, Meteor.bindEnvironment(NFLService._parseScores));

  }

  static getStaticScores() {

    const nflData = {
       "w": 4,
       "gms":    [
                {
             "hs": 13,
             "d": "Wed",
             "gsis": 56893,
             "vs": 20,
             "eid": 2016083151,
             "h": "TB",
             "ga": "",
             "rz": -1,
             "v": "WAS",
             "vnn": "Redskins",
             "t": "8:00",
             "q": "F",
             "hnn": "Buccaneers"
          },
                {
             "hs": 7,
             "d": "Thu",
             "gsis": 56885,
             "vs": 7,
             "eid": 2016090151,
             "h": "ATL",
             "ga": "",
             "rz": 0,
             "v": "JAX",
             "vnn": "Jaguars",
             "t": "7:00",
             "q": "2",
             "hnn": "Falcons"
          },
                {
             "hs": 7,
             "d": "Thu",
             "gsis": 56892,
             "vs": 14,
             "eid": 2016090159,
             "h": "MIA",
             "ga": "",
             "rz": 0,
             "v": "TEN",
             "vnn": "Titans",
             "t": "7:00",
             "q": "2",
             "hnn": "Dolphins"
          },
                {
             "hs": 0,
             "d": "Thu",
             "gsis": 56887,
             "vs": 6,
             "eid": 2016090152,
             "h": "NYG",
             "ga": "",
             "rz": 0,
             "v": "NE",
             "vnn": "Patriots",
             "t": "7:00",
             "q": "1",
             "hnn": "Giants"
          },
                {
             "hs": 0,
             "d": "Thu",
             "gsis": 56888,
             "vs": 6,
             "eid": 2016090153,
             "h": "PHI",
             "ga": "",
             "rz": 0,
             "v": "NYJ",
             "vnn": "Jets",
             "t": "7:00",
             "q": "2",
             "hnn": "Eagles"
          },
                {
             "hs": 0,
             "d": "Thu",
             "gsis": 56889,
             "vs": 0,
             "eid": 2016090155,
             "h": "CAR",
             "ga": "",
             "rz": 0,
             "v": "PIT",
             "vnn": "Steelers",
             "t": "7:30",
             "q": "1",
             "hnn": "Panthers"
          },
                {
             "hs": 0,
             "d": "Thu",
             "gsis": 56900,
             "vs": 0,
             "eid": 2016090154,
             "h": "CIN",
             "ga": "",
             "rz": 0,
             "v": "IND",
             "vnn": "Colts",
             "t": "7:30",
             "q": "1",
             "hnn": "Bengals"
          },
                {
             "hs": 10,
             "d": "Thu",
             "gsis": 56895,
             "vs": 0,
             "eid": 2016090157,
             "h": "DET",
             "ga": "",
             "rz": 0,
             "v": "BUF",
             "vnn": "Bills",
             "t": "7:30",
             "q": "1",
             "hnn": "Lions"
          },
                {
             "hs": 0,
             "d": "Thu",
             "gsis": 56896,
             "vs": 0,
             "eid": 2016090161,
             "h": "CLE",
             "ga": "",
             "rz": -1,
             "v": "CHI",
             "vnn": "Bears",
             "t": "8:00",
             "q": "P",
             "hnn": "Browns"
          },
                {
             "hs": 0,
             "d": "Thu",
             "gsis": 56899,
             "vs": 0,
             "eid": 2016090163,
             "h": "DAL",
             "ga": "",
             "rz": -1,
             "v": "HOU",
             "vnn": "Texans",
             "t": "8:00",
             "q": "P",
             "hnn": "Cowboys"
          },
                {
             "hs": 0,
             "d": "Thu",
             "gsis": 56898,
             "vs": 0,
             "eid": 2016090162,
             "h": "KC",
             "ga": "",
             "rz": -1,
             "v": "GB",
             "vnn": "Packers",
             "t": "8:00",
             "q": "P",
             "hnn": "Chiefs"
          },
                {
             "hs": 0,
             "d": "Thu",
             "gsis": 56886,
             "vs": 0,
             "eid": 2016090158,
             "h": "MIN",
             "ga": "",
             "rz": -1,
             "v": "LA",
             "vnn": "Rams",
             "t": "8:00",
             "q": "P",
             "hnn": "Vikings"
          },
                {
             "hs": 0,
             "d": "Thu",
             "gsis": 56894,
             "vs": 0,
             "eid": 2016090160,
             "h": "NO",
             "ga": "",
             "rz": -1,
             "v": "BAL",
             "vnn": "Ravens",
             "t": "8:00",
             "q": "P",
             "hnn": "Saints"
          },
                {
             "hs": 0,
             "d": "Thu",
             "gsis": 56897,
             "vs": 0,
             "eid": 2016090164,
             "h": "ARI",
             "ga": "",
             "rz": -1,
             "v": "DEN",
             "vnn": "Broncos",
             "t": "9:30",
             "q": "P",
             "hnn": "Cardinals"
          },
                {
             "hs": 0,
             "d": "Thu",
             "gsis": 56891,
             "vs": 0,
             "eid": 2016090166,
             "h": "OAK",
             "ga": "",
             "rz": -1,
             "v": "SEA",
             "vnn": "Seahawks",
             "t": "10:00",
             "q": "P",
             "hnn": "Raiders"
          },
                {
             "hs": 0,
             "d": "Thu",
             "gsis": 56890,
             "vs": 0,
             "eid": 2016090165,
             "h": "SD",
             "ga": "",
             "rz": -1,
             "v": "SF",
             "vnn": "49ers",
             "t": "10:00",
             "q": "P",
             "hnn": "Chargers"
          }
       ],
       "t": "PRE",
       "gd": "1",
       "bph": "17",
       "igh": [   {
          "id": "0ap3000000693825",
          "d": "New England Patriots defensive back Justin Coleman recovers a fumble by New York Giants running back Paul Perkins.",
          "gsis": "56887",
          "abbr": "",
          "pid": "918",
          "type": "igh",
          "eid": "2016090152"
       }],
       "y": 2016
    };

    NFLService._parseScores(null, true, nflData);

  }

  static _parseScores(error, response, data) {

    if (_.isNil(data)) {
      return;
    }

    // Find week
    let week = Week.findOne({ nflWeek: data.w });

    // if week !exists, insert week and continue...
    if (!week) {

      let new_week = new Week({
        leagueId: '2017-18',
        nflWeek: data.w,
        createdAt: new Date(),
        games: []
      });

      Meteor.call('weeks.insert', new_week);

      week = Week.findOne({ nflWeek: data.w });
    }

    // parse games
    let games = GameService.getGames(data.gms);

    // update games in week
    Meteor.call('weeks.update', week, 'games', games);

  }

}
