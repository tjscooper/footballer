import request from 'request';
import _ from 'lodash';

import SpreadService from '../service/spread-service.js';

export default class ProlineService {

  constructor() {

  }

  static getPointSpread() {

    console.log("Getting spreads:", new Date());

    let options = {
      url: `https://www.proline.ca/olg-proline-services/rest/api/pointspread/events/all.json`,
      json: true
    };

    request(options, Meteor.bindEnvironment(ProlineService._parsePointSpread));

  }

  static _parsePointSpread(error, response, data) {

    if (!data) {
      throw new Meteor.Error('No data in Proline feed');
    }

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
