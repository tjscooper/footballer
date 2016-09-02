import { Class } from 'meteor/jagi:astronomy';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import Game from './game.js';

export const WeeksCollection = new Mongo.Collection('weeks');

export default Week = Class.create({
  name: 'Week',
  collection: WeeksCollection,
  fields: {
    leagueId: String,
    nflWeek: String,
    createdAt: Date,
    games: [Game]
  }
});
