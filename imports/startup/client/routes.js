import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/signup/signup-home.js';
import '../../ui/pages/signin/signin-home.js';
import '../../ui/pages/keephome/keep-home.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
   FlowRouter.go('App.signin');
  },
});

FlowRouter.route('/signup', {
  name: 'App.signup',
  action() {
    BlazeLayout.render('App_body', { main: 'App_signup' });
  },
});

FlowRouter.route('/signin', {
  name: 'App.signin',
  action() {
    BlazeLayout.render('App_body', { main: 'App_signin' });
  },
});

FlowRouter.route('/keep/:userName', {
  name: 'App.keep',
  action(params) {
    BlazeLayout.render('App_body', { main: 'App_keep', params: params });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
