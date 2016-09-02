export default class WeekService {

  constructor() {

  }

  static insert(model) {

    if (!model instanceof Week) {
      throw new Meteor.Error('weeks.insert: invalid model');
    }

    let week = Week.findOne({ nflWeek: model.nflWeek });
    if (week instanceof Week) {
      throw new Meteor.Error(`weeks.insert: week ${ model.nflWeek } exists`);
    }

    model.save();

  }

  static update(model, field, value) {

    if (!model instanceof Week) {
      throw new Meteor.Error('weeks.update: invalid model');
    }

    model.set(field, value);
    model.save();

  }

  static remove(model) {

    if (!model instanceof Week) {
      throw new Meteor.Error('weeks.remove: invalid model');
    }

    model.remove();

  }
}
