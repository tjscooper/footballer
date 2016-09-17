import { Meteor } from 'meteor/meteor';

import CronService from '../imports/service/cron-service.js';
import NFLService from '../imports/service/nfl-service.js';
import ProlineService from '../imports/service/proline-service.js';


Meteor.startup(() => {

  CronService.register();
  CronService.start();

  ProlineService.getPointSpread();
  NFLService.getScores();

});
