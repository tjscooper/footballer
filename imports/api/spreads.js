import { Meteor } from 'meteor/meteor';

import Spread from '../model/spread.js';
import SpreadService from '../service/spread-service.js';

if (Meteor.isServer) {
  Meteor.publish('spreads', function spreadsPublication(query = {}) {
    return Spread.find(query);
  });
}

Meteor.methods({
  'spreads.insert'(model) { return SpreadService.insert(model); },
  'spreads.update'(model, field, value) { return SpreadService.update(model, field, value); },
  'spreads.remove'(model) { return SpreadService.remove(model); },
});
