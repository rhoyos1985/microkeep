import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';
import { Keeps } from '/imports/api/keeps/keeps.js';
import Validation from '../../helpers/validations.js';

import { insert, remove, update } from '../../../api/keeps/methods.js';

import './keep.html';

Template.keep.onCreated(function keepOnCreated() { 
	Meteor.subscribe('keeps.all');
	Session.set('keepsErrors', {});
	let data = this.data;
	
	if (!Meteor.user()){
		FlowRouter.go('App.signin');
	}

	this.username = new ReactiveVar(data.userName);
	this.updateKeep = new ReactiveVar({});
  this.keepsuser = new ReactiveVar(Keeps.find({}, { sort: {createAt: 1, priority: 1} }));
  this.checked = new ReactiveVar(false);
  this.checkedPrio = new ReactiveVar(false);
});

Template.keep.helpers({  
	username() {
	  return Template.instance().username.get();
	},
	keepsuser() {
		return Template.instance().keepsuser.get();
	},

	errors() { 
		let errorMesage = Session.get('keepsErrors');
		return errorMesage.textkeep;  
	},
	updateKeep(){
		return Template.instance().updateKeep.get();
	},
  checked(){
    return Template.instance().checked.get();
  },
  checkedPrio(){
    return Template.instance().checkedPrio.get();
  }
});

Template.keep.events({
  'click .link_logout'(event) {
    event.preventDefault();
	Meteor.logout();
	FlowRouter.go('App.signin');
  },  // Fires when any element is clicked
  'submit .form_submit_keep'(event) { 
  	event.preventDefault();

  	const target = event.target;
  	const keep = target.textkeep.value;
  	const priority = parseInt(target.keeppriority.value);
  	
  	const keepParams = {
  		textkeep: keep,
  	}

  	const errors = Validation.validateKeep(keepParams);

  	if(errors.textkeep){
  	  return Session.set('keepsErrors', errors);
  	}

  	insert.call({ keep,  priority}, (err) => {
  		if (err) {
  			alert(err);
  		}
  		else{
  			target.textkeep.value='';
  			target.keeppriority.value='1';
  		}
  	});
  },
  'click .keep_link'(event, template){
  	event.preventDefault();
  	let updateKeep =  Keeps.findOne({_id: this._id});
	template.updateKeep.set(updateKeep);
  },
  'submit .form_submit_keepUpdate'(event,template){
  	event.preventDefault();

  	const target = event.target;
  	const keepUdate = template.updateKeep.get();
  	const keepId = keepUdate._id;
  	const keep = target.textkeepUpdate.value;
  	const priority = parseInt(target.keeppriorityUpdate.value);

  	update.call({ 
  			keepId,
          	newKeep: keep,
          	newPriority: priority,
        }, (err) => {
        	if(err){
        		alert(err);
        	}
        	else{
        		target.textkeepUpdate.value = '';
        		target.keeppriorityUpdate.value = '1';
            $('#myModal').modal('hide');
        	}
    });

  },
  'click .keeptitle_item'(event) {
  	event.preventDefault();

  	let keepId = this._id;

  	remove.call({ keepId }, (err) => {
  		if(err){
  			alert(err);
  		}
  	});
  },
  'click .toggle-checked'(event, template){
      event.preventDefault();

      let target = event.target;
      let order = !template.checked.get();
      let orderPriority = template.checkedPrio.get();
      let orderby = order ? -1 : 1;
      let orderbyPriority = orderPriority ? -1 : 1;

      template.keepsuser.set(Keeps.find({}, { sort: {createAt: orderby, priority: orderbyPriority} }))
      template.checked.set(order);
  },
  'click .toggle-checked_priority'(event, template){
      event.preventDefault();

      let target = event.target;
      let order = template.checked.get();
      let orderPriority = !template.checkedPrio.get();
      let orderby = order ? -1 : 1;
      let orderbyPriority = orderPriority ? -1 : 1;

      template.keepsuser.set(Keeps.find({}, { sort: {priority: orderbyPriority, createAt: orderby } }))
      template.checkedPrio.set(orderPriority);
  }
});