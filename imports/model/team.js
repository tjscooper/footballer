import { Class } from 'meteor/jagi:astronomy';
import { Meteor } from 'meteor/meteor';

/* NFL Live Stream game obj
{
   "hs": 7,           // Home Score
   "d": "Thu",        // Day of the Week
   "gsis": 56895,     // ??
   "vs": 0,           // Visitor Score
   "eid": 2016090157, // NFL Game Id
   "h": "DET",        // Home Team City abbr.
   "ga": "",          // ??
   "rz": 0,           // ??
   "v": "BUF",        // Visitor Team City abbr.
   "vnn": "Bills",    // Visitor Team Nickname
   "t": "7:30",       // Game Time
   "q": "1",          // Quarter  ['F', '']
   "hnn": "Lions"     // Home Team Nickname
}
*/

export default Team = Class.create({
  name: 'Team',
  fields: {
    city: String,
    nickname: String,
    score: Number,
    teamId: String
  }
});
