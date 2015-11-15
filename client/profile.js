Template.profile.helpers({
	posts: function(){
		return Posts.find({userId: Meteor.userId()});
	},

	admins: function(){
		return Meteor.users.find({admin: true});
	},

	upvoteCount: function(){
		if (Meteor.user() === undefined || Meteor.user().upvoted.length === 0){
			return 0;
		}
		return Meteor.user().upvoted.length;
	},

	commentCount: function(){

		return Comments.find({userId: Meteor.userId()}).count();
	},
	email: function(){
		return Meteor.user().services.google.email;
	},

	post: function() {
		return Meteor.user().postsMade;
	},
	
	firstName: function(){
		return Meteor.user().services.google.given_name;
	}
});

Template.profile.events({

	"click .add-admin": function(){
		var netId = document.getElementById("netId").value;
		console.log("net: " + netId);
		if (netId != ""){
			Meteor.call("setAdmin", netId, true, function(err, data){
				if (data == 0){
					document.getElementById("admin-error").innerHTML = "User does not exist";
				}
			});
		}
	},

	"click .remove-admin": function(){
		console.log(this._id);
		var user = Meteor.users.findOne(this._id);
    	Meteor.call("setAdmin", user.netId, false, function(err, data){
    		console.log(data);
    	});
    }
});