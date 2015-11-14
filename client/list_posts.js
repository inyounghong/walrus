Meteor.subscribe("posts");
Meteor.subscribe("categories");


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
    Meteor.call("upvotePost", this._id);
  },
  "click .Downvote" : function(event) {
    Meteor.call("downvotePost", this._id);
  }
});
