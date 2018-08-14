import { Class } from 'meteor/jagi:astronomy';
import { Meteor } from 'meteor/meteor';

import Team from './team.js';

export default Game = Class.create({
  name: 'Game',
  fields: {
    nflGameId: Number,
    createdAt: Date,
    home: Team,
    visitor: Team,
    quarter: String,
    time: String,
    day: String,
    redZone: Boolean,
    gameClock: String,
    down: Number,
    yardsToGo: Number,
    yardline: String,
    yardlineSide: String,
    yardlineNumber: String,
    possessionTeamId: String,
    possessionTeamAbbr: String,
    alertPlayType: String,
    winner: {
      type: Object,
      default: []
    },
    spread: {
      type: Object,
      default: {}
    }
  }
});
