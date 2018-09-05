import { Meteor } from 'meteor/meteor';

import Week from '../model/week.js';
import WeekService from '../service/week-service.js';

if (Meteor.isServer) {
  const leagueId = '2018-19';
  const excludeSeasonType = 'PRE';
  Meteor.publish('weeks.last', function weeksPublication() {
    return Week.find({ leagueId, seasonType: { $ne: excludeSeasonType } }, { sort: { nflWeek: -1 }, limit: 1 });
  });
}

Meteor.methods({
  'weeks.insert'(model) { return WeekService.insert(model); },
  'weeks.update'(model, field, value) { return WeekService.update(model, field, value); },
  'weeks.remove'(model) { return WeekService.remove(model); },
});
