import { Class } from 'meteor/jagi:astronomy';
import { Meteor } from 'meteor/meteor';

import Team from './team.js';

/* NFL Live Stream game obj
{
   "hs": 7,           // Home Score
   "vs": 0,           // Visitor Score
   "h": "DET",        // Home Team City abbr.
   "v": "BUF",        // Visitor Team City abbr.
   "vnn": "Bills",    // Visitor Team Nickname
   "hnn": "Lions"     // Home Team Nickname
}
*/

export default Game = Class.create({
  name: 'Game',
  fields: {
    nflGameId: Number,
    createdAt: Date,
    home: Team,
    visitor: Team,
    quarter: String,
    time: String,
    redZone: Number
  }
});
