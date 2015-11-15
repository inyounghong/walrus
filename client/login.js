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

  
});

Template.menu.helpers({
  isLogged: function(){
    if (Meteor.userId() === null){
      return false;
    }
    return true;
  },

  username: function(){
    var name = Meteor.user().name;
    return name.split(" ")[0];
  }
});

Template.menu.events({
  "click #logout": function (err, t){
    Meteor.logout(function(err) {
    });
  }
})