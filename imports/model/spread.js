import { Class } from 'meteor/jagi:astronomy';
import { Meteor } from 'meteor/meteor';

export default Spread = Class.create({
  name: 'Spread',
  fields: {
    fav: String,
    points: Number
  }
});
