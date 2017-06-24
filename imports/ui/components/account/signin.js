import './signin.html';

Template.signin.onCreated(function signinOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.signin.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.signin.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

Template.signin.events({
  'submit .signin_user'(event) {
    event.preventDefault();

    const target = event.target;
    const emailsigin = target.emailsigin;
    const passsignin = target.passsignin;

    alert('emailsigin: '+ emailsigin.value + 'passsignin: ' + passsignin.value);
    
  },
});

