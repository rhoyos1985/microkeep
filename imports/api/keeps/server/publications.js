import { Meteor } from 'meteor/meteor';
import { Keeps } from '../keeps.js';

Meteor.publish('keeps.all', function () {
  if(!this.userId) {
  	return this.ready();
  }
  return Keeps.find({
  	userId: this.userId,
  },{
  	fields: Keeps.publicFields,
  });
});