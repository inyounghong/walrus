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
  },

  replies: function() {
    var ids = Comments.findOne({_id: this._id}).replies;
    var result = [];
    for (i = 0; i < ids.length; i++ ) {
      var temp = Comments.findOne({_id: ids[i]});
      result.push(temp);
    }
    return result;
  }
});

Template.comment.events( {

  "click #add-reply" : function(event ) {
    var text = document.getElementById("reply-text").value;
    var isAnonymous = document.getElementById("anonymous").checked;
    var commId = this._id;
    console.log(this);
    if (isAnonymous){
      var name = "Anonymous";
    } else{
      var name = Meteor.user().services.google.name;
    }
    if (text != ""){
      console.log("hi");
      Meteor.call("addComment", text, name, null, function(error,data){
        if (data){
          document.getElementById("reply-text").value = "";
          Meteor.call("addReply", commId, data);
        }
      });
    }
  }
});

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
