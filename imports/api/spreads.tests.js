/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { expect } from 'meteor/practicalmeteor:chai';

import Spread, { SpreadsCollection } from '../model/spread.js';
import Spreads from './spreads.js';

if (Meteor.isServer) {
  describe('Spreads', () => {
    describe('methods', () => {
      let spread, spread2;

      beforeEach(() => {
        SpreadsCollection.remove({});

        spread = new Spread({
          fav: 'DAL',
          points: 4.5,
          homeCity: 'DAL',
          visitorCity: 'SEA'
        });

        spread.save();

        spread2 = new Spread({
          fav: 'MIN',
          points: 1.5,
          homeCity: 'MIN',
          visitorCity: 'MIA'
        });

      });

      it('can create a spread using spreads.insert method', () => {
        const method = Meteor.server.method_handlers['spreads.insert'];

        // Run the method with `this` set to the fake invocation
        method.apply({}, [spread2]);

        // Verify that the beforeEach method does what we expected
        expect(Spread.find().count()).to.equal(2);
      });

    });
  });
}
