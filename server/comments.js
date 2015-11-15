Meteor.publish("comments", function () {
  return Comments.find();
});

Meteor.methods({
  addComment: function (text, name, post_id) {
    // Make sure the user is logged in before inserting a task
    // if (! Meteor.userId()) {
    //   throw new Meteor.Error("not-authorized");
    // }
  
    // Insert a post record
    Comments.insert({
      text: text,
      createdAt: new Date(),
      userId: Meteor.userId(),
      votes: 0,
      name: name,
      deleted: false,
      postId: post_id
    });
  },

  deleteComment: function (commentId) {
    Comments.update(commentId, {$set: 
      {
        text: "[deleted]",
        deleted: true
      }
    });
  },

  upvoteComment: function(postId) {
    Comments.update(postId, {$inc: {votes: 1}});
  },

  downvoteComment: function(postId) {
    Comments.update(postId, {$inc: {votes: -1}});
  }
});