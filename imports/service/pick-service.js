import Pick from '../model/pick.js';

export default class PickService {

  constructor() {

  }

  static insert(model) {

    if (!model instanceof Pick) {
      throw new Meteor.Error('picks.insert: invalid model');
    }

    let pick = Pick.findOne({ gameId: model.gameId });
    if (pick instanceof Pick) {
      throw new Meteor.Error(`picks.insert: pick ${ model.gameId } exists`);
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
}
