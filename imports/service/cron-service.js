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
      name: 'Get scores from NFL website',
      schedule: function(parser) {
        // parser is a later.parse object
        // return parser.text('every 5 minutes after 1:00 pm on Thurs,Sun and Mon');
        return parser.text('every 30 seconds');
      },
      job: function() {
        // Live Data
        // NFLService.getScores();

        // Mock Data
        NFLService.getStaticScores();
      }
    });

    SyncedCron.add({
      name: 'Get point spread from Proline website',
      schedule: function(parser) {
        // parser is a later.parse object
        // return parser.text('after 12th hour on Wed');
        return parser.text('every 30 seconds');
      },
      job: function() {
        // Live Data
        // ProlineService.getPointSpread();

        // Mock Data
        ProlineService.getStaticPointSpread();
      }
    });

  }


}
