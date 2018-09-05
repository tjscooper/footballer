import Standings from '../model/standings.js';

export default class StandingsService {

  constructor() {

  }

  static insert(model) {

    if (!model instanceof Standings) {
      throw new Meteor.Error('standings.insert: invalid model');
    }

    const excludedSeasonType = 'PRE';
    let standings = Standings.findOne({ leagueId: model.leagueId, seasonType: { $ne: excludedSeasonType } });
    if (standings instanceof Standings) {
      throw new Meteor.Error(`standings.insert: leagueId ${ model.leagueId } exists`);
    }

    model.save();

  }

  static update(model, field, value) {

    if (!model instanceof Standings) {
      throw new Meteor.Error('standings.update: invalid model');
    }

    model.set(field, value);
    model.save();

  }

  static remove(model) {

    if (!model instanceof Standings) {
      throw new Meteor.Error('standings.remove: invalid model');
    }

    model.remove();

  }
}
