import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Class } from 'meteor/jagi:astronomy';

import Week from '../model/week.js';

if (Meteor.isServer) {
  // This code only runs on the server
  // limit finds
  Meteor.publish('weeks', function weeksPublication(query = {}) {
    return Week.find(query);
  });
}

Meteor.methods({
  'weeks.insert'(model) {

    if (!model instanceof Week) {
      throw new Meteor.Error('weeks.insert: invalid model');
    }

    model.save();

  },

  'weeks.update'(model, field, value) {

    if (!model instanceof Week) {
      throw new Meteor.Error('weeks.update: invalid model');
    }

    model.set(field, value);
    model.save();

  },

  'weeks.remove'(model) {

    if (!model instanceof Week) {
      throw new Meteor.Error('weeks.remove: invalid model');
    }

    model.remove();

  },

});
