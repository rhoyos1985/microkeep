import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';

import './keep.html';

Template.keep.onCreated(function keepOnCreated() { 
	let data = this.data;
	if (!Meteor.user() || data.userName != Meteor.user().username)
		FlowRouter.go('App.signin');

	this.username = new ReactiveVar(data.userName);
});

Template.keep.helpers({  
	username() {
	  return Template.instance().username.get();
	},
});

Template.keep.events({
  'click .link_logout'(event) {
    event.preventDefault();
	Meteor.logout();
	FlowRouter.go('App.signin');
  },
});