Meteor.subscribe("comments");

Template.post.helpers({
  comments: function () {
    return Comments.find({}, {sort: {createdAt: -1}});
  },

});

Template.post.events({
  "click #add-comment": function (event) {
    event.preventDefault();
    var text = document.getElementById("comment-text").value;
    var isAnonymous = document.getElementById("anonymous").value;
    Meteor.call("addComment", text);
    document.getElementById("comment-text").value = "";
  },

  "click .delete": function () {
    console.log(this._id);
    Meteor.call("deleteComment", this._id);
  },

  
});
