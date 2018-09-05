import { Meteor } from 'meteor/meteor';

import { ReactiveAggregate } from 'meteor/jcbernack:reactive-aggregate';
import { WeeksCollection } from '../model/week.js';

if (Meteor.isServer) {
  Meteor.publish('stats.games.won', function ({ leagueId }) {
    ReactiveAggregate(this, WeeksCollection, [
      { $match: { leagueId, seasonType: { $ne: 'PRE' } } },
      { $project: { 'games.nflGameId': 1, 'games.winner': 1, 'games.quarter': 1 } },
      { $unwind: '$games' },
      { $unwind: '$games.winner' },
      { $match: { 'games.quarter': { $eq: 'FINAL' } } },
      { $lookup: { from: 'picks', localField: 'games.nflGameId', foreignField: 'nflGameId', as: 'picks' } },
      { $unwind: '$picks' },
      { $project: { 'games': 1, 'picks': 1, 'total': { $sum: 1 } } },
      { $lookup: { from: 'users', localField: 'picks.userId', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $project: { 'games.winner': 1, 'picks.userId': 1, 'picks.city': 1, 'user.username': 1, 'total': { $sum: 1 } } },
      {
        $group: {
          _id: '$picks.userId',
          name: { $first: '$user.username' },
          wins: { $sum: { $cond: { if: { $eq: ['$games.winner', '$picks.city'] }, then: 1, else: 0 } } },
          total: { $sum: '$total' }
        }
      },
      { $sort: { wins: -1 } }
    ], { clientCollection: "StatsGamesWon" });
  });
}
