import './signup.html';

Template.signup.onCreated(function signupOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.signup.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.signup.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});