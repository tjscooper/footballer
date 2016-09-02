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
      const gameId = Random.id();
      const gameId2 = Random.id();

      let pick;
      let pick2;

      beforeEach(() => {
        PicksCollection.remove({});

        pick = new Pick({
          userId,
          gameId,
          createdAt: new Date(),
          city: 'DAL'
        });

        pick.save();

        pick2 = new Pick({
          userId,
          gameId: gameId2,
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

        pick = Pick.findOne({ gameId });

        // Run the method with `this` set to the fake invocation
        method.apply({}, [pick, 'city', 'SEA']);

        pick2 = Pick.findOne({ gameId });
        expect(pick2).to.be.an('object');
        expect(pick2.city).to.equal('SEA');
      });

      it('can delete a pick using picks.remove method', () => {
        const method = Meteor.server.method_handlers['picks.remove'];

        pick = Pick.findOne({ gameId });

        method.apply({}, [pick]);

        // Verify that the method does what we expected
        expect(Pick.find().count()).to.equal(0);
      });

    });
  });
}
