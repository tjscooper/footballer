import { SyncedCron } from 'meteor/percolate:synced-cron';

import NFLService from './nfl-service.js';

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
        return parser.text('every 30 seconds');
      },
      job: function() {
        // Live Data
        // NFLService.getScores();

        // Mock Data
        NFLService.getStaticScores();
      }
    });

  }


}
