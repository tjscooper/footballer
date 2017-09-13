import request from 'request';
import _ from 'lodash';

import SpreadService from '../service/spread-service.js';

export default class ProlineService {

  constructor() {

  }

  static getPointSpread() {

    console.log("Getting spreads...");

    let options = {
      url: `https://www.proline.ca/olg-proline-services/rest/api/pointspread/events/all.json`,
      json: true
    };

    request(options, Meteor.bindEnvironment(ProlineService._parsePointSpread));

  }

  static getStaticPointSpread() {

    console.log("sending static data...");

    let prolineData = {
    	"lastUpdated": 1473010051089,
    	"jsonCallback": null,
    	"events": {
    		"@class": "com.olson.olg.proline.dataModels.dto.pointspread.events.PointSpreadEventsDTO",
    		"eventList": [{
    			"@class": "com.olson.olg.proline.dataModels.dto.pointspread.events.PointSpreadEventListDTO",
    			"listDate": 1472961600000,
    			"listNumber": "2426",
    			"eventList": [{
    				"@class": "com.olson.olg.proline.dataModels.dto.pointspread.events.PointSpreadSingleEventDTO",
    				"id": "3",
    				"startTime": "01:30PM",
    				"home": "TB",
    				"homeName": "PHILADELPHIA",
    				"visitor": "WAS",
    				"visitorName": "ATLANTA",
    				"sport": "FTB",
    				"cutoffDate": "2016-09-04 13:30:00.0",
    				"pointSpread": "-7.0 ",
    				"status": {
    					"closed": false,
    					"suspended": false,
    					"cancelled": false,
    					"outcomeEN": null,
    					"outcomeFR": null,
    					"eventOutcomeEN": null,
    					"eventOutcomeFR": null
    				}
    			}, {
    				"@class": "com.olson.olg.proline.dataModels.dto.pointspread.events.PointSpreadSingleEventDTO",
    				"id": "4",
    				"startTime": "01:30PM",
    				"home": "ATL",
    				"homeName": "PITTSBURGH",
    				"visitor": "JAX",
    				"visitorName": "MILWAUKEE",
    				"sport": "FTB",
    				"cutoffDate": "2016-09-04 13:30:00.0",
    				"pointSpread": " -5.5",
    				"status": {
    					"closed": false,
    					"suspended": false,
    					"cancelled": false,
    					"outcomeEN": null,
    					"outcomeFR": null,
    					"eventOutcomeEN": null,
    					"eventOutcomeFR": null
    				}
    			}, {
    				"@class": "com.olson.olg.proline.dataModels.dto.pointspread.events.PointSpreadSingleEventDTO",
    				"id": "5",
    				"startTime": "01:30PM",
    				"home": "MIA",
    				"homeName": "BALTIMORE",
    				"visitor": "TEN",
    				"visitorName": "NEW YORK-Y",
    				"sport": "FTB",
    				"cutoffDate": "2016-09-04 13:30:00.0",
    				"pointSpread": " -1.5",
    				"status": {
    					"closed": false,
    					"suspended": false,
    					"cancelled": false,
    					"outcomeEN": null,
    					"outcomeFR": null,
    					"eventOutcomeEN": null,
    					"eventOutcomeFR": null
    				}
    			}, {
    				"@class": "com.olson.olg.proline.dataModels.dto.pointspread.events.PointSpreadSingleEventDTO",
    				"id": "6",
    				"startTime": "02:00PM",
    				"home": "NYG",
    				"homeName": "MINNESOTA",
    				"visitor": "NE",
    				"visitorName": "CHICAGO-S",
    				"sport": "FTB",
    				"cutoffDate": "2016-09-04 14:00:00.0",
    				"pointSpread": "-3.5",
    				"status": {
    					"closed": false,
    					"suspended": false,
    					"cancelled": false,
    					"outcomeEN": null,
    					"outcomeFR": null,
    					"eventOutcomeEN": null,
    					"eventOutcomeFR": null
    				}
    			}, {
    				"@class": "com.olson.olg.proline.dataModels.dto.pointspread.events.PointSpreadSingleEventDTO",
    				"id": "7",
    				"startTime": "02:15PM",
    				"home": "PHI",
    				"homeName": "KANSAS CITY",
    				"visitor": "NYJ",
    				"visitorName": "DETROIT",
    				"sport": "FTB",
    				"cutoffDate": "2016-09-04 14:15:00.0",
    				"pointSpread": " -12.5",
    				"status": {
    					"closed": false,
    					"suspended": false,
    					"cancelled": false,
    					"outcomeEN": null,
    					"outcomeFR": null,
    					"eventOutcomeEN": null,
    					"eventOutcomeFR": null
    				}
    			}, {
    				"@class": "com.olson.olg.proline.dataModels.dto.pointspread.events.PointSpreadSingleEventDTO",
    				"id": "8",
    				"startTime": "02:15PM",
    				"home": "CAR",
    				"homeName": "CHICAGO-C",
    				"visitor": "PIT",
    				"visitorName": "SAN FRANCISCO",
    				"sport": "FTB",
    				"cutoffDate": "2016-09-04 14:15:00.0",
    				"pointSpread": "-2.5",
    				"status": {
    					"closed": false,
    					"suspended": false,
    					"cancelled": false,
    					"outcomeEN": null,
    					"outcomeFR": null,
    					"eventOutcomeEN": null,
    					"eventOutcomeFR": null
    				}
    			}, {
    				"@class": "com.olson.olg.proline.dataModels.dto.pointspread.events.PointSpreadSingleEventDTO",
    				"id": "9",
    				"startTime": "03:00PM",
    				"home": "CIN",
    				"homeName": "TEXAS",
    				"visitor": "IND",
    				"visitorName": "HOUSTON",
    				"sport": "FTB",
    				"cutoffDate": "2016-09-04 15:00:00.0",
    				"pointSpread": " -1.5",
    				"status": {
    					"closed": false,
    					"suspended": false,
    					"cancelled": false,
    					"outcomeEN": null,
    					"outcomeFR": null,
    					"eventOutcomeEN": null,
    					"eventOutcomeFR": null
    				}
    			}, {
    				"@class": "com.olson.olg.proline.dataModels.dto.pointspread.events.PointSpreadSingleEventDTO",
    				"id": "19",
    				"startTime": "03:00PM",
    				"home": "DET",
    				"homeName": "SASKATCHEWAN",
    				"visitor": "BUF",
    				"visitorName": "WINNIPEG",
    				"sport": "FTB",
    				"cutoffDate": "2016-09-04 15:00:00.0",
    				"pointSpread": "-5.0 ",
    				"status": {
    					"closed": false,
    					"suspended": false,
    					"cancelled": false,
    					"outcomeEN": null,
    					"outcomeFR": null,
    					"eventOutcomeEN": null,
    					"eventOutcomeFR": null
    				}
    			}, {
    				"@class": "com.olson.olg.proline.dataModels.dto.pointspread.events.PointSpreadSingleEventDTO",
    				"id": "10",
    				"startTime": "04:00PM",
    				"home": "CLE",
    				"homeName": "OAKLAND",
    				"visitor": "CHI",
    				"visitorName": "BOSTON",
    				"sport": "FTB",
    				"cutoffDate": "2016-09-04 16:00:00.0",
    				"pointSpread": "-1.0 ",
    				"status": {
    					"closed": false,
    					"suspended": false,
    					"cancelled": false,
    					"outcomeEN": null,
    					"outcomeFR": null,
    					"eventOutcomeEN": null,
    					"eventOutcomeFR": null
    				}
    			}, {
    				"@class": "com.olson.olg.proline.dataModels.dto.pointspread.events.PointSpreadSingleEventDTO",
    				"id": "11",
    				"startTime": "04:00PM",
    				"home": "DAL",
    				"homeName": "COLORADO",
    				"visitor": "HOU",
    				"visitorName": "ARIZONA",
    				"sport": "FTB",
    				"cutoffDate": "2016-09-04 16:00:00.0",
    				"pointSpread": " -4.5",
    				"status": {
    					"closed": false,
    					"suspended": false,
    					"cancelled": false,
    					"outcomeEN": null,
    					"outcomeFR": null,
    					"eventOutcomeEN": null,
    					"eventOutcomeFR": null
    				}
    			}, {
    				"@class": "com.olson.olg.proline.dataModels.dto.pointspread.events.PointSpreadSingleEventDTO",
    				"id": "12",
    				"startTime": "04:00PM",
    				"home": "KC",
    				"homeName": "SEATTLE",
    				"visitor": "GB",
    				"visitorName": "LA ANAHEIM",
    				"sport": "FTB",
    				"cutoffDate": "2016-09-04 16:00:00.0",
    				"pointSpread": " -0.5",
    				"status": {
    					"closed": false,
    					"suspended": false,
    					"cancelled": false,
    					"outcomeEN": null,
    					"outcomeFR": null,
    					"eventOutcomeEN": null,
    					"eventOutcomeFR": null
    				}
    			}, {
    				"@class": "com.olson.olg.proline.dataModels.dto.pointspread.events.PointSpreadSingleEventDTO",
    				"id": "13",
    				"startTime": "04:00PM",
    				"home": "MIN",
    				"homeName": "CLEVELAND",
    				"visitor": "LA",
    				"visitorName": "MIAMI",
    				"sport": "FTB",
    				"cutoffDate": "2016-09-04 16:00:00.0",
    				"pointSpread": " -3.5",
    				"status": {
    					"closed": false,
    					"suspended": false,
    					"cancelled": false,
    					"outcomeEN": null,
    					"outcomeFR": null,
    					"eventOutcomeEN": null,
    					"eventOutcomeFR": null
    				}
    			}, {
    				"@class": "com.olson.olg.proline.dataModels.dto.pointspread.events.PointSpreadSingleEventDTO",
    				"id": "14",
    				"startTime": "04:00PM",
    				"home": "NO",
    				"homeName": "LOS ANGELES-D",
    				"visitor": "BAL",
    				"visitorName": "SAN DIEGO",
    				"sport": "FTB",
    				"cutoffDate": "2016-09-04 16:00:00.0",
    				"pointSpread": " -3.5",
    				"status": {
    					"closed": false,
    					"suspended": false,
    					"cancelled": false,
    					"outcomeEN": null,
    					"outcomeFR": null,
    					"eventOutcomeEN": null,
    					"eventOutcomeFR": null
    				}
    			}, {
    				"@class": "com.olson.olg.proline.dataModels.dto.pointspread.events.PointSpreadSingleEventDTO",
    				"id": "48",
    				"startTime": "07:30PM",
    				"home": "ARI",
    				"homeName": "TEXAS",
    				"visitor": "DEN",
    				"visitorName": "NOTRE DAME",
    				"sport": "FTB",
    				"cutoffDate": "2016-09-04 19:30:00.0",
    				"pointSpread": "-4.0 ",
    				"status": {
    					"closed": false,
    					"suspended": false,
    					"cancelled": false,
    					"outcomeEN": null,
    					"outcomeFR": null,
    					"eventOutcomeEN": null,
    					"eventOutcomeFR": null
    				}
    			}]
    		}, {
    			"@class": "com.olson.olg.proline.dataModels.dto.pointspread.events.PointSpreadEventListDTO",
    			"listDate": 1473048000000,
    			"listNumber": "2426",
    			"eventList": [{
    				"@class": "com.olson.olg.proline.dataModels.dto.pointspread.events.PointSpreadSingleEventDTO",
    				"id": "20",
    				"startTime": "03:00PM",
    				"home": "OAK",
    				"homeName": "CALGARY",
    				"visitor": "SEA",
    				"visitorName": "EDMONTON",
    				"sport": "FTB",
    				"cutoffDate": "2016-09-05 15:00:00.0",
    				"pointSpread": " -7.0",
    				"status": {
    					"closed": false,
    					"suspended": false,
    					"cancelled": false,
    					"outcomeEN": null,
    					"outcomeFR": null,
    					"eventOutcomeEN": null,
    					"eventOutcomeFR": null
    				}
    			}, {
    				"@class": "com.olson.olg.proline.dataModels.dto.pointspread.events.PointSpreadSingleEventDTO",
    				"id": "21",
    				"startTime": "06:30PM",
    				"home": "SD",
    				"homeName": "HAMILTON",
    				"visitor": "SF",
    				"visitorName": "TORONTO",
    				"sport": "FTB",
    				"cutoffDate": "2016-09-05 18:30:00.0",
    				"pointSpread": " -9.0",
    				"status": {
    					"closed": false,
    					"suspended": false,
    					"cancelled": false,
    					"outcomeEN": null,
    					"outcomeFR": null,
    					"eventOutcomeEN": null,
    					"eventOutcomeFR": null
    				}
    			}, {
    				"@class": "com.olson.olg.proline.dataModels.dto.pointspread.events.PointSpreadSingleEventDTO",
    				"id": "49",
    				"startTime": "08:00PM",
    				"home": "FLST",
    				"homeName": "FLORIDA ST.",
    				"visitor": "MISS",
    				"visitorName": "MISSISSIPPI",
    				"sport": "CFB",
    				"cutoffDate": "2016-09-05 20:00:00.0",
    				"pointSpread": " -5.5",
    				"status": {
    					"closed": false,
    					"suspended": false,
    					"cancelled": false,
    					"outcomeEN": null,
    					"outcomeFR": null,
    					"eventOutcomeEN": null,
    					"eventOutcomeFR": null
    				}
    			}]
    		}]
    	}
    };

    ProlineService._parsePointSpread(null, true, prolineData);

  }

  static _parsePointSpread(error, response, data) {

    let eventDays = data.events.eventList;
    let games = [];

    _.each(eventDays, eventDay => {
      _.each(eventDay, events => {
        _.each(events, event => {

          if (_.isObject(event) && event.sport === 'FTB') {

			if (event.home === 'LACH') {
				event.home = 'LAC';
			}
			if (event.visitor === 'LACH') {
				event.visitor = 'LAC';
			}
			if (event.home === 'LAR') {
				event.home = 'LA';
			}
			if (event.visitor === 'LAR') {
				event.visitor = 'LA';
			}
            if (event.home === 'JAK') {
              event.home = 'JAX';
            }
            if (event.visitor === 'JAK') {
              event.visitor = 'JAX';
            }
            if (event.home === 'NWO') {
              event.home = 'NO';
            }
            if (event.visitor === 'NWO') {
              event.visitor = 'NO';
            }
            if (event.home === 'ARZ') {
              event.home = 'ARI';
            }
            if (event.visitor === 'ARZ') {
              event.visitor = 'ARI';
            }

            games.push(event);
          }
        });
      });
    });

    _.each(games, game => {

      let { pointSpread, home, visitor } = game;

      let fav = SpreadService.getFav(pointSpread, home, visitor);
      let points = Math.abs(parseFloat(pointSpread));

      let new_spread = new Spread({
        fav,
        points,
        homeCity: home,
        visitorCity: visitor
      });

      try {
        Meteor.call('spreads.insert', new_spread);
      } catch(e) {
      }

    });


  }

}
