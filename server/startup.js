import { Meteor } from 'meteor/meteor';

import CronService from '../imports/service/cron-service.js';

Meteor.startup(() => {

  CronService.register();
  CronService.start();

});
