import { Class } from 'meteor/jagi:astronomy';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const SpreadsCollection = new Mongo.Collection('spreads');

export default Spread = Class.create({
  name: 'Spread',
  collection: SpreadsCollection,
  fields: {
    fav: String,
    points: Number,
    homeCity: String,
    visitorCity: String
  }
});
