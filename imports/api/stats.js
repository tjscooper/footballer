import { Meteor } from 'meteor/meteor';

import { ReactiveAggregate } from 'meteor/jcbernack:reactive-aggregate';
import { WeeksCollection } from '../model/week.js';

if (Meteor.isServer) {
  Meteor.publish('stats.games.won', function ({ leagueId }) {
    ReactiveAggregate(this, WeeksCollection, [
      { $match: { leagueId, seasonType: { $eq: 'REG' } } },
      { $project: { 'games.nflGameId': 1, 'games.winner': 1, 'games.quarter': 1 } },
      { $unwind: '$games' },
      { $unwind: '$games.winner' },
      { $match: { 'games.quarter': { $in: ['FINAL', 'FINAL_OVERTIME'] } } },
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

  Meteor.publish('stats.weekly.winners', function ({ leagueId }) {
    ReactiveAggregate(this, WeeksCollection, [
      { $match: { leagueId, seasonType: { $eq: 'REG' } } },
      { $unwind: '$games' },
      { $match: { 'games.quarter': { $in: ['FINAL', 'FINAL_OVERTIME'] } } },
      { $lookup: { from: 'picks', localField: 'games.nflGameId', foreignField: 'nflGameId', as: 'picks' } },
      {
        $project: {
          _id: 0,
          nflWeek: 1,
          nflGameId: '$games.nflGameId',
          winner: { $arrayElemAt: ['$games.winner', 0] },
          picks: {
            $filter: {
              input: '$picks',
              as: 'picks',
              cond: { $eq: ['$$picks.city', { $arrayElemAt: ['$games.winner', 0] }] }
            }
          }
        }
      },
      { $unwind: '$picks' },
      { $lookup: { from: 'users', localField: 'picks.userId', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      {
        $project: {
          nflWeek: 1,
          nflGameId: 1,
          winner: 1,
          userId: '$user._id',
          username: '$user.username',
          pick: '$picks.city'
        }
      },
      {
        $group: {
          _id: '$nflWeek',
          data: {
            $push: {
              userId: '$userId',
              username: '$username',
              nflGameId: '$nflGameId',
              pick: '$pick'
            }
          }
        }
      },
      { $sort: { _id: -1 } }
    ], { clientCollection: "StatsWeeklyWinners" });
  });
}
