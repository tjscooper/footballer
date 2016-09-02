import request from 'request';
import _ from 'lodash';

export default class ProlineService {

  constructor() {

  }

  static getPointSpread() {

    let random = Random.id();

    let options = {
      url: `https://www.proline.ca/olg-proline-services/rest/api/pointspread/events/all.jsonp?callback=?`,
      json: true
    };

    request(options, ProlineService._parseScores);

  }

  static loadPointSpread() {

    const prolineData = {};

    ProlineService._parsePointSpread(null, true, prolineData);

  }

  static _parsePointSpread(error, response, data) {

    // @TODO parse point spread data from proline...

  }

}
