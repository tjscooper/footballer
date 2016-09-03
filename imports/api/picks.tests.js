/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { expect } from 'meteor/practicalmeteor:chai';

import Pick, { PicksCollection } from '../model/pick.js';
import Picks from './picks.js';

if (Meteor.isServer) {
  describe('Picks', () => {
    describe('methods', () => {
      const userId = Random.id();
      const nflGameId = 20161003;
      const nflGameId2 = 20161004;

      let pick;
      let pick2;

      beforeEach(() => {
        PicksCollection.remove({});

        pick = new Pick({
          userId,
          nflGameId,
          createdAt: new Date(),
          city: 'DAL'
        });

        pick.save();

        pick2 = new Pick({
          userId,
          nflGameId: nflGameId2,
          createdAt: new Date(),
          city: 'CAR'
        });

      });

      it('can create a pick using picks.insert method', () => {
        const method = Meteor.server.method_handlers['picks.insert'];

        let invocation = { userId };

        // Run the method with `this` set to the fake invocation
        method.apply(invocation, [pick2]);

        // Verify that the beforeEach method does what we expected
        expect(Pick.find().count()).to.equal(2);
      });

      it('can update a pick using picks.update method', () => {
        const method = Meteor.server.method_handlers['picks.update'];

        pick = Pick.findOne({ nflGameId });

        // Run the method with `this` set to the fake invocation
        method.apply({}, [pick, 'city', 'SEA']);

        pick2 = Pick.findOne({ nflGameId });
        expect(pick2).to.be.an('object');
        expect(pick2.city).to.equal('SEA');
      });

      it('can delete a pick using picks.remove method', () => {
        const method = Meteor.server.method_handlers['picks.remove'];

        pick = Pick.findOne({ nflGameId });

        method.apply({}, [pick]);

        // Verify that the method does what we expected
        expect(Pick.find().count()).to.equal(0);
      });

      it('can create a pick using picks.select method', () => {
        const method = Meteor.server.method_handlers['picks.select'];

        let selection = { nflGameId: 20161005, city: 'WAS' };

        let invocation = { userId };

        method.apply(invocation, [selection]);

        // Verify that the method does what we expected
        expect(Pick.find().count()).to.equal(2);
      });

      it('can update a pick using picks.select method', () => {
        const method = Meteor.server.method_handlers['picks.select'];

        let selection = { nflGameId: 20161003, city: 'WAS' };

        let invocation = { userId };

        method.apply(invocation, [selection]);

        let pick = Pick.findOne({ nflGameId });

        // Verify that the method does what we expected
        expect(pick.city).to.equal('WAS');
      });

    });
  });
}
