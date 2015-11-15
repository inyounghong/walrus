Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId});
});

ServiceConfiguration.configurations.remove({
  service: "google"
});
ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "535353328688-fgfekbppd2n1ccgpe9o0s2ch56gjqa39.apps.googleusercontent.com",
  loginStyle: "popup",
  secret: "TBs8FFiAfWq6Sjo1kxDWWWgF"
});

Accounts.onCreateUser(function (options, user) {
  	if (Meteor.isServer){
		user.upvoted = [];
		user.downvoted = [];
		user.admin = false;
		var email = user.services.google.email;
		var domain = email.split("@");
		if (domain == "cornell.edu"){
			user.cornell = 	
		}
		
	}
	if (options.profile){
		user.profile = options.profile;
	}
	return user;
});

Meteor.methods({
	upvotePostToUser: function(user,id) {
		count = 0;
		if(Meteor.users.findOne({_id: user._id}).upvoted.indexOf(id) == -1){
			count = 1
			Meteor.users.update({_id: user._id}, {$addToSet: {upvoted: id}});
			if (Meteor.users.findOne({_id: user._id}).downvoted.indexOf(id) != -1){
				Meteor.users.update({_id: user._id}, {$addToSet: {upvoted: id}});
				Meteor.users.update({_id: user._id}, {$pull: {downvoted: id}});
				//upvotePost(id);
				count = 2
			};
			return [id,count];
		}
		else{
			Meteor.users.update({_id: user._id}, {$pull: {upvoted: id}});
			return [id,-1];
		};
	},

	downvotePostToUser: function(user,id) {
		count = 0;
		if(Meteor.users.findOne({_id: user._id}).downvoted.indexOf(id) == -1){
			Meteor.users.update({_id: user._id}, {$addToSet: {downvoted: id}});
			count = 1;
			if (Meteor.users.findOne({_id: user._id}).upvoted.indexOf(id) != -1){
				Meteor.users.update({_id: user._id}, {$addToSet: {downvoted: id}});
				Meteor.users.update({_id: user._id}, {$pull: {upvoted: id}});
				count = 2;
				//downvotePost(id);
			};
			return [id,count];
		}
		else{
			Meteor.users.update({_id: user._id}, {$pull: {downvoted: id}});
			return [id,-1];
		};
	}
});