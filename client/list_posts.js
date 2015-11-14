Meteor.subscribe("posts");


Template.index.helpers({
  posts: function () {
    // Show newest posts at the top
    if (Session.get("hideCompleted")) {
      // If hide completed is checked, filter posts
      return Posts.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
    } else {
      // Otherwise, return all of the posts
      return Posts.find({}, {sort: {createdAt: -1}});
    }
  },
  hideCompleted: function () {
    return Session.get("hideCompleted");
  },
  incompleteCount: function () {
    return Posts.find({checked: {$ne: true}}).count();
  }
});

Template.index.events({
  "submit .new-post": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var text = event.target.text.value;

    // Insert a post into the collection
    Meteor.call("addPost", text);

    // Clear form
    event.target.text.value = "";
  },
  "change .hide-completed input": function (event) {
    Session.set("hideCompleted", event.target.checked);
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
  }
});

 Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});