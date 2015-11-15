Meteor.subscribe("posts");
Meteor.subscribe("categories");
Meteor.subscribe("userData");


Template.index.helpers({
  posts: function () {
    return Posts.find({}, {sort: {createdAt: -1}});
  },

  votes: function () {
    return Posts.find();
  },

  tabs: function() {
    return Categories.find();
  }

});

Template.index.events({
  
  "change .hide-completed input": function (event) {
    Session.set("hideCompleted", event.target.checked);
  },

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

Template.list_post.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  },

  // Returns name of poster
  name: function (){
    return this.userId;
  }
});

 Template.list_post.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Meteor.call("setChecked", this._id, ! this.checked);
  },
  "click .delete": function () {
    console.log(this._id);
    Meteor.call("deletePost", this._id);
  },

  "click .Upvote" : function (event) {
    Meteor.call("upvotePostToUser", Meteor.user(), this._id, function(error,data){
      if (data != null){
           Meteor.call("upvotePost", data[0],data[1]);
         }
    });
      
    },

  "click .Downvote" : function(event) {
     Meteor.call("downvotePostToUser",Meteor.user(),this._id, function(error,data){
        if (data!= null) {
          Meteor.call("downvotePost", data[0],data[1]);
        }
    });
    
  }
});
