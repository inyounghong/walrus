Meteor.subscribe("comments");

Template.post.helpers({
  comments: function () {
    return Comments.find({}, {sort: {votes: -1}});
  },

});

Template.post.events({
  "click #add-comment": function (event) {
    event.preventDefault();
    var text = document.getElementById("comment-text").value;
    var isAnonymous = document.getElementById("anonymous").checked;
    Meteor.call("addComment", text);
    document.getElementById("comment-text").value = "";
  },

  "click .delete": function () {
    console.log(this._id);
    Meteor.call("deleteComment", this._id);
  },

  "click .upvote-comment" : function (event) {
    Meteor.call("upvoteComment", this._id);
  },
  "click .downvote-comment" : function(event) {
    Meteor.call("downvoteComment", this._id);
  }

  
});
