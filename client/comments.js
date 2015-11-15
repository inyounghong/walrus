Meteor.subscribe("comments");
Meteor.subscribe("userData");
Template.post.helpers({
  comments: function () {
    return Comments.find({postId: this._id}, {sort: {createdAt: -1}});
  },

});

Template.comment.helpers({
  activeUpvote: function(){
    console.log(this._id);
    if (Meteor.user().upvoted.indexOf(this._id) > -1){
      return "active-vote";
    }
  },
  activeDownvote: function(){
    if (Meteor.user().downvoted.indexOf(this._id) > -1){
      return "active-vote";
    }
  }
})

Template.post.events({

  "click .Upvote" : function (event) {
    console.log(this);
    Meteor.call("upvotePostToUser", Meteor.user(), this._id , function(error,data){
      if (data != null){
            console.log(data[0]);
            console.log(data[1]);
           Meteor.call("upvotePost", data[0],data[1]);
         }
    });
      
    },

  "click .Downvote" : function(event) {
     Meteor.call("downvotePostToUser", Meteor.user(), this._id, function(error,data){
        if (data!= null) {
          Meteor.call("downvotePost", data[0],data[1]);
        }
    });
    
  },

  "click #add-comment": function (event) {
    event.preventDefault();
    var text = document.getElementById("comment-text").value;
    var isAnonymous = document.getElementById("anonymous").checked;

    if (isAnonymous){
      var name = "Anonymous";
    } else{
      var name = Meteor.user().services.google.name;
    }

    if (text != ""){
      Meteor.call("addComment", text, name, this._id);
      document.getElementById("comment-text").value = "";
    }
    
  },

  "click .delete": function () {
    console.log(this._id);
    Meteor.call("deleteComment", this._id);
  },

  "click .upvote-comment" : function (event) {
    Meteor.call("upvotePostToUser", Meteor.user(), this._id, function(error,data) {
      if (data != null) {
        Meteor.call("upvoteComment", data[0],data[1]);
      }
    });
    
  },
  "click .downvote-comment" : function(event) {
     Meteor.call("downvotePostToUser",Meteor.user(),this._id, function(error,data){
        if (data!= null) {
          Meteor.call("downvoteComment", data[0],data[1]);
        }
    });
    
  },

  
});
