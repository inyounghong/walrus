Meteor.subscribe("posts");

Template.tab.helpers( {
	posts: function() {
		console.log(this.subject);
		var status = Session.get("status");
		var filter = Session.get("filter");

		if (filter == null){
			Session.set("filter", "Top");
			filter = "Top";
		}

		if (filter == "Top"){
			var sort = {sort: {votes: -1}};
		}
		else if (filter == "Oldest") {
			var sort = {sort: {createdAt: 1}};
		}
		else if (filter == "Newest" ) {
			var sort = {sort: {createdAt: -1}};
		}

	    if (status === undefined || status == ""){
	      return Posts.find({category: this.subject}, sort);
	    }
	    else{
	      var status_array = status.split("/");
	      var all_status = ["open", "resolved", "closed", "progress"];
	      var data = [];

	      if (status_array.length == 0){
	        return Posts.find({}, {sort: {createdAt: -1}});
	      }
	      for (i = 0; i < status_array.length -1; i++){
	        data.push({status: status_array[i], category: this.subject});
	      }
	      return Posts.find({ $or: data}, sort);
	    }
	},

	title: function(){
		return this.subject;
	},

	topIsSelected: function() {
		return Session.get("filter") == "Top";
	},

	oldestIsSelected: function() {
		return Session.get("filter") == "Oldest";
	},

	newestIsSelected: function() {
		return Session.get("filter") == "Newest";
	}
});


Template.tab.events( {
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
	    console.log(str);
	    Session.set("status", str);
	  }
});