// Get google data
Meteor.subscribe("userData");

Accounts.config({
  forbidClientAccountCreation : true
});