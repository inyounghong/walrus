Meteor.subscribe("posts");

Template.home.helpers({
	categories: function () {
		return Categories.find();
	},

	postCount: function(){
		console.log(this.name);
		return Posts.find({category: this.name}).count();
	}

});
