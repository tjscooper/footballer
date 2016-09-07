import { Meteor } from 'meteor/meteor';

import NFLService from '../service/nfl-service.js';
import ProlineService from '../service/proline-service.js';

Meteor.methods({
  'cron.nfl'() { return NFLService.getScores(); },
  'cron.proline'() { return ProlineService.getPointSpread(); },
});
