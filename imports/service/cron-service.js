import { SyncedCron } from 'meteor/percolate:synced-cron';

import NFLService from './nfl-service.js';
import ProlineService from './proline-service.js';

export default class CronService {

  constructor() {

  }

  static start() {

    SyncedCron.start();

  }

  static stop() {

    SyncedCron.stop();

  }

  static register() {

    SyncedCron.add({
      name: 'Get inital week from NFL website',
      schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('at 10:30 am and 1:30 pm every Wednesday and Thursday');
      },
      job: function() {
        NFLService.getScores();
      }
    });

    SyncedCron.add({
      name: 'Get scores from NFL website',
      schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('every 2 minutes every Thursday, Saturday, Sunday, and Monday');
      },
      job: function() {
        // Live Data
        NFLService.getScores();
      }
    });

    SyncedCron.add({
      name: 'Get standings from NFL website',
      schedule: function (parser) {
        // parser is a later.parse object
        return parser.text('at 1:30 am every Monday and Tuesday');
      },
      job: function () {
        // Live Data
        NFLService.getStandings();
      }
    });

    SyncedCron.add({
      name: 'Get point spread from Proline website',
      schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('at 11:00 am and 2:00 pm every Wednesday and Thursday');
      },
      job: function() {
        ProlineService.getPointSpread();
      }
    });

  }


}
