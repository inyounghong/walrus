Meteor.publish("posts", function () {
  return Posts.find();
});


Meteor.methods({

  addPost: function (title, text, cat, name, status) {
    // Make sure the user is logged in before inserting a task
    // if (! Meteor.userId()) {
    //   throw new Meteor.Error("not-authorized");
    // }
  
    // Insert a post record
    var data = {
      title: title,
      text: text,
      createdAt: new Date(),
      userId: Meteor.userId(),
      username: Meteor.user().username,
      votes: 0,
      category: cat,
      status: status,
      name: name
    };
    return Posts.insert(data);
  },
  updatePost: function (id, text, cat, name, status) {
    var data = {
      category: cat,
      title: title,
      text: text,
      status: status,
      name: name
    };
    return Posts.update(id, {$set: data});
  },
  deletePost: function (postId) {
    Posts.remove(postId);
  },

  upvotePost: function(postId,count) {
    Posts.update(postId, {$inc: {votes: count}});
  },

  downvotePost: function(postId,count) {
    Posts.update(postId, {$inc: {votes: -1*count}});
  }
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