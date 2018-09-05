import { Meteor } from 'meteor/meteor';

import CronService from '../imports/service/cron-service.js';
import NFLService from '../imports/service/nfl-service.js';
import ProlineService from '../imports/service/proline-service.js';


Meteor.startup(() => {

  WebApp.connectHandlers.use(function(req, res, next) {
    // add allow origin
    res.setHeader('Access-Control-Allow-Origin', '*');

    // add headers
    res.setHeader('Access-Control-Allow-Headers', [
      'Accept',
      'Accept-Charset',
      'Accept-Encoding',
      'Accept-Language',
      'Accept-Datetime',
      'Authorization',
      'Cache-Control',
      'Connection',
      'Cookie',
      'Content-Length',
      'Content-MD5',
      'Content-Type',
      'Date',
      'User-Agent',
      'X-Requested-With',
      'Origin'
    ].join(', '));

    return next();
  });

  CronService.register();
  CronService.start();

  NFLService.getScores();
  NFLService.getStandings();

  ProlineService.getPointSpread();
});
