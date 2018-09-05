import { Class } from 'meteor/jagi:astronomy';
import { Mongo } from 'meteor/mongo';

export const StandingsCollection = new Mongo.Collection('standings');

export default Standings = Class.create({
  name: 'Standings',
  collection: StandingsCollection,
  fields: {
    leagueId: String,
    seasonType: String,
    createdAt: Date,
    teams: [Object]
  }
});
