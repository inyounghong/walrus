Meteor.subscribe("posts");
Meteor.subscribe("categories");
Meteor.subscribe("userData");


Template.index.helpers({
  posts: function () {

    var status = Session.get("status");
    console.log(status);
    if (status === undefined || status == ""){
      return Posts.find({}, {sort: {createdAt: -1}});
    }
    else{
      console.log(status);
      
      var status_array = status.split("/");
      console.log("length:" + status_array.length);
      var all_status = ["open", "resolved", "closed", "progress"];
      var data = [];

      if (status_array.length == 0){
        console.log("nothing")
        return Posts.find({}, {sort: {createdAt: -1}});
      }
      for (i = 0; i < status_array.length -1; i++){
        data.push({status: status_array[i]});
      }
      console.log(data);
      return Posts.find({ $or: data}, {sort: {createdAt: -1}});
    }
    
  },

  votes: function () {
    return Posts.find();
  },

  tabs: function() {
    return Categories.find();
  },



});

Template.index.events({
  
  "change .hide-completed input": function (event) {
    Session.set("hideCompleted", event.target.checked);
  },

  "change #filter" : function(event) {
    Session.set("filter", document.getElementById("filter").value);
  },

  "change .status-checks input" : function(event) {

    var checkboxes = document.getElementsByClassName("status-checkbox");
    var str = "";
    for (var i=0; i< checkboxes.length; i++){
      if (checkboxes[i].checked){
        str += checkboxes[i].value + "/";
      }
    }
    Session.set("status", str);
  }
  
});

Template.list_post.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  },

  isCornell: function(){
    console.log(Meteor.user());
    return Meteor.user().cornell;
  },

  hasRights: function(){
    return (Meteor.user().cornell || Meteor.user().admin);
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
