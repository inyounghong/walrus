Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId});
});

ServiceConfiguration.configurations.remove({
  service: "google"
});
ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "535353328688-fgfekbppd2n1ccgpe9o0s2ch56gjqa39.apps.googleusercontent.com",
  loginStyle: "popup",
  secret: "TBs8FFiAfWq6Sjo1kxDWWWgF"
});

Accounts.onCreateUser(function (options, user) {
  console.log('Creating user: ' + user.username);
  return user;
});