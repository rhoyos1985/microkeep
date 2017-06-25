import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';
import Validation from '../../helpers/validations.js';

import './signup.html';

Template.signup.onCreated(function signupOnCreated() { 
    Session.set('signupErrors', {});
});

Template.signup.helpers({  
  errorMessage: function(field) {    
    return Session.get('signupErrors')[field];  
  },  
  errorClass: function (field) {    
    return !!Session.get('signupErrors')[field] ? 'has-error' : '';  
  }
});

Template.signup.events({
  'submit .signup_user'(event) {
    event.preventDefault();

    const target = event.target;
    const usernamesignup = target.usernamesignup;
    const emailsignup = target.emailsignup;
    const passsignup = target.passsignup;
    const passsignup_confirm = target.passsignup_confirm;

    const signupParams = {
      usernamesignup: usernamesignup.value,
      emailsignup: emailsignup.value,
      passsignup: passsignup.value,
      passsignup_confirm: passsignup_confirm.value
    }

    const errors = Validation.validateSignup(signupParams);
    
    if(errors.usernamesignup || errors.emailsignup || errors.passsignup || errors.passsignup_confirm)
      return Session.set('signupErrors', errors);

  	const account = {
      username: signupParams.usernamesignup,
      email: signupParams.emailsignup,
      password: signupParams.passsignup
    }  

    Accounts.createUser(account, (err) =>{
    	if(err) {
    		alert(err.reazon);
    	}
    	FlowRouter.go('/keep/' + Meteor.user().username);
    });
  },
});