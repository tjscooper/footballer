import { Meteor } from 'meteor/meteor';

import Pick from '../model/pick.js';
import PickService from '../service/pick-service.js';

if (Meteor.isServer) {
  Meteor.publish('picks', function picksPublication(query = {}) {
    return Pick.find(query);
  });
}

Meteor.methods({
  'picks.insert'(model) { return PickService.insert(model); },
  'picks.update'(model, field, value) { return PickService.update(model, field, value); },
  'picks.remove'(model) { return PickService.remove(model); },
});
