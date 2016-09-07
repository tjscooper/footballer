import _ from 'lodash';

import Pick from '../model/pick.js';

export default class PickService {

  constructor() {

  }

  static insert(model) {

    if (!model instanceof Pick) {
      throw new Meteor.Error('picks.insert: invalid model');
    }

    let pick = Pick.findOne({ nflGameId: model.nflGameId, userId: model.userId });
    if (pick instanceof Pick) {
      throw new Meteor.Error(`picks.insert: pick ${ model.nflGameId } exists`);
    }

    model.save();

  }

  static update(model, field, value) {

    if (!model instanceof Pick) {
      throw new Meteor.Error('picks.update: invalid model');
    }

    model.set(field, value);
    model.save();

  }

  static remove(model) {

    if (!model instanceof Pick) {
      throw new Meteor.Error('picks.remove: invalid model');
    }

    model.remove();

  }

  static select(userId, selection) {

    let { nflGameId, city } = selection;

    let pick = Pick.findOne({ userId, nflGameId });

    if (_.isNil(pick)) {

      let new_pick = new Pick({
        userId,
        nflGameId,
        createdAt: new Date(),
        city
      });

      PickService.insert(new_pick)
      return;
    }

    PickService.update(pick, 'city', city);

  }
}
