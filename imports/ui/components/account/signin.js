import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Validation from '../../helpers/validations.js';

import './signin.html';

Template.signin.onCreated(function signinOnCreated() {
  Session.set('signinErrors', {});
});

Template.signin.helpers({
  errorMessage: function(field) {    
      return Session.get('signinErrors')[field];  
  },  
  errorClass: function (field) {    
    return !!Session.get('signinErrors')[field] ? 'has-error' : '';  
  }
});

Template.signin.events({
  'submit .signin_user'(event) {
    event.preventDefault();

    const target = event.target;
    const emailsigin = target.emailsigin;
    const passsignin = target.passsignin;

    const signinParams = {
      emailsigin: emailsigin.value,
      passsignin: passsignin.value,
    }

    const errors = Validation.validateSignin(signinParams);
        
    if(errors.emailsigin || errors.passsignin )
      return Session.set('signinErrors', errors);

    Meteor.loginWithPassword(signinParams.emailsigin, signinParams.passsignin, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        FlowRouter.go('/keep/' + Meteor.user().username);
      }
    });
    
  },
});


/*Template.signup.onCreated(function signupOnCreated() { 
    
});

Template.signup.helpers({  
  
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
});*/
