Meteor.publish("posts", function () {
  return Posts.find();
});

Meteor.methods({
  addPost: function (text) {
    // Make sure the user is logged in before inserting a task
    // if (! Meteor.userId()) {
    //   throw new Meteor.Error("not-authorized");
    // }
  
    // Insert a post record
    Posts.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deletePost: function (postId) {
    Posts.remove(postId);
  },
  // setChecked: function (postId, setChecked) {
  //   Posts.update(postId, { $set: { checked: setChecked} });
  // },
  // setPrivate: function (postId, setToPrivate) {
  //   var task = Post.findOne(postId);
 
  //   // Make sure only the task owner can make a task private
  //   if (task.owner !== Meteor.userId()) {
  //     throw new Meteor.Error("not-authorized");
  //   }
 
  //   Post.update(postId, { $set: { private: setToPrivate } });
  // }
});