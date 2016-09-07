import _ from 'lodash';

import Spread from '../model/spread.js';

export default class SpreadService {

  constructor() {

  }

  static getFav(points, homeCity, visitorCity) {

    // In Proline data, they pass the home team score with a space in front
    // ex. " -7.5", so if string length is 5, it's a home pick, 4 for visitor
    return points.length === 5 ? homeCity : visitorCity;
  }

  static getSpread(home, visitor) {

    // find spread where home and visitor teams are present
    let spread = Spread.findOne({ homeCity: home.city, visitorCity: visitor.city });

    // mock proline fav and spread
    // let fav = Math.floor((Math.random() * 2) + 1) === 1 ? home.city : visitor.city;
    // let points = -Math.round((Math.random() * 10) + 1).toFixed(1);

    if (_.isNil(spread)) {
      return;
    }

    return spread;
  }

  static insert(model) {

    if (!model instanceof Pick) {
      throw new Meteor.Error('spreads.insert: invalid model');
    }

    let spread = Spread.findOne({ homeCity: model.homeCity, visitorCity: model.visitorCity });
    if (spread instanceof Spread) {
      throw new Meteor.Error(`spreads.insert: spread for ${ model.homeCity } vs. ${ model.visitorCity } exists`);
    }

    model.save();

  }

}
