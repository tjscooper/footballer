import { Meteor } from 'meteor/meteor';

import Week from '../model/week.js';
import WeekService from '../service/week-service.js';

if (Meteor.isServer) {
  Meteor.publish('weeks', function weeksPublication(query = {}) {
    return Week.find(query);
  });
}

Meteor.methods({
  'weeks.insert'(model) { return WeekService.insert(model); },
  'weeks.update'(model, field, value) { return WeekService.update(model, field, value); },
  'weeks.remove'(model) { return WeekService.remove(model); },
});
