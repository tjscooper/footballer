import { Meteor } from 'meteor/meteor';

import Standings from '../model/standings.js';
import StandingsService from '../service/standings-service.js';

if (Meteor.isServer) {
  const leagueId = '2018-19';
  const excludeSeasonType = 'PRE';
  Meteor.publish('standings.last', function standingsPublication() {
    return Standings.find({ leagueId, seasonType: { $ne: excludeSeasonType } });
  });
}

Meteor.methods({
  'standings.insert'(model) { return StandingsService.insert(model); },
  'standings.update'(model, field, value) { return StandingsService.update(model, field, value); },
  'standings.remove'(model) { return StandingsService.remove(model); },
});
