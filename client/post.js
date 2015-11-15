// Post Page (format: /post/:id)

Template.post.helpers({
  activeUpvote: function(){
  	var id = this._id
    if (Meteor.user().upvoted.indexOf(id) > -1){
      return "active-vote";
    }
  },
  activeDownvote: function(){
    if (Meteor.user().downvoted.indexOf(this._id) > -1){
      return "active-vote";
    }
  },

  hasAuth: function(){
  	if (Meteor.user().admin || Meteor.userId() == this.userId){
  		return true;
  	}
  },

  commentCount: function(){
  	return Comments.find({postId: this._id}).count();
  }
});