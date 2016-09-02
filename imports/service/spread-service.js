import _ from 'lodash';

import Spread from '../model/spread.js';

export default class SpreadService {

  constructor() {

  }

  static getSpread(home, visitor) {

    // mock proline fav and spread
    let fav = Math.floor((Math.random() * 2) + 1) === 1 ? home.city : visitor.city;
    let points = -Math.round((Math.random() * 10) + 1).toFixed(1);

    return new Spread({
      fav,
      points
    });
  }

}
