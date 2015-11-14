Meteor.subscribe("posts");

Template.tab.helpers( {
	posts: function() {
		var filter = Session.get("filter");
		if (filter == null){
			Session.set("filter", "Top");
			filter = "Top";
		}
		if (filter == "Top"){
			return Posts.find({}, {sort: {votes: -1}});
		}

		else if (filter == "Oldest") {
			return Posts.find({}, {sort: {createdAt: 1}});
		}
	},

	topIsSelected: function() {
		return Session.get("filter") == "Top";
	},

	oldestIsSelected: function() {
		return Session.get("filter") == "Oldest"
	}
});


Template.tab.events( {
	"change #filter" : function(event) {
		Session.set("filter", document.getElementById("filter").value);
	}
});