Template.login.events( {
  "click #loginWithGoogle": function(err, t){
    Meteor.loginWithGoogle({
      requestPermissions: ["email"],
      loginStyle: "popup"
    }, function(err) {
      if (err) {
        // TODO Need to do something here with the error...
        console.log('Error: ', err);
      } 
    });
  },

  "click #logout": function (err, t){
    Meteor.logout(function(err) {

    });
  }
});