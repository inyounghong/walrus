Meteor.publish("userData", function () {
  return Meteor.users.find();
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
  		user.postsMade = {};
		user.upvoted = [];
		user.downvoted = [];
		user.admin = false;
		user.name = user.services.google.name;
		var email = user.services.google.email;
		var domain = email.split("@");
		user.netId = domain[0];
		console.log(domain[1]);
		if (domain[1] == "cornell.edu"){
			user.cornell = 	true;
		} 
		else {
			user.cornell = 	false;
		}
		
	}
	if (options.profile){
		user.profile = options.profile;
	}
	return user;
});

Meteor.methods({
	setAdmin: function (netId, isAdmin){
		return Meteor.users.update({netId: netId}, {$set: {admin: isAdmin}});
	},
	upvotePostToUser: function(user,id) {
		count = 0;
		if(Meteor.users.findOne({_id: user._id}).upvoted.indexOf(id) == -1){
			count = 1;
			console.log(Meteor.user().upvoted);
			Meteor.users.update({_id: user._id}, {$addToSet: {upvoted: id}});
			console.log(Meteor.user().upvoted);
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