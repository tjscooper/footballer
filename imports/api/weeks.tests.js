/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { expect } from 'meteor/practicalmeteor:chai';

import Week, { WeeksCollection } from '../model/week.js';
import Weeks from './weeks.js';

if (Meteor.isServer) {
  describe('Weeks', () => {
    describe('methods', () => {
      const userId = Random.id();
      let week, week2;

      beforeEach(() => {
        WeeksCollection.remove({});

        week = new Week({
          leagueId: '123',
          nflWeek: 1,
          seasonType: 'REG',
          createdAt: new Date(),
          games: []
        });

        week.save();

        week2 = new Week({
          leagueId: '123',
          nflWeek: 2,
          seasonType: 'REG',
          createdAt: new Date(),
          games: []
        });
      });

      it('can create a week using weeks.insert method', () => {
        const method = Meteor.server.method_handlers['weeks.insert'];

        // Run the method with `this` set to the fake invocation
        method.apply({}, [week2]);

        // Verify that the beforeEach method does what we expected
        expect(Week.find().count()).to.equal(2);
      });

      it('can update a week using weeks.update method', () => {
        const method = Meteor.server.method_handlers['weeks.update'];

        week = Week.findOne({ nflWeek: 1 });

        // Run the method with `this` set to the fake invocation
        method.apply({}, [week, 'nflWeek', 2]);

        week2 = Week.findOne({ nflWeek: 2 });
        expect(week2).to.be.an('object');
        expect(week2.nflWeek).to.equal(2);
      });

      it('can delete a week using weeks.remove method', () => {
        const method = Meteor.server.method_handlers['weeks.remove'];

        week = Week.findOne({ nflWeek: 1 });

        method.apply({}, [week]);

        // Verify that the method does what we expected
        expect(Week.find().count()).to.equal(0);
      });

    });
  });
}
