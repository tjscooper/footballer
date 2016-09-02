import { Class } from 'meteor/jagi:astronomy';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const PicksCollection = new Mongo.Collection('picks');

export default Pick = Class.create({
  name: 'Pick',
  collection: PicksCollection,
  fields: {
    userId: String,
    gameId: String,
    createdAt: Date,
    city: String
  }
});
