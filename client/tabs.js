Meteor.subscribe("posts");

Template.tab.helpers( {
	posts: function() {
		var status = Session.get("status");
		console.log("STATUS: " + status);
		var filter = Session.get("filter");
		var category = {category: this.subject};

		if (this.subject == "all"){
			category = {};
		}

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
	      return Posts.find(category, sort);
	    }
	    else{
	      var status_array = status.split("/");
	      var all_status = ["open", "resolved", "closed", "progress"];
	      var data = [];

	      if (status_array.length == 0){
	        return Posts.find({}, {sort: {createdAt: -1}});
	      }
	      for (i = 0; i < status_array.length -1; i++){
	      	if (this.subject == "all"){
				data.push({status: status_array[i]});
			}else {
					data.push({status: status_array[i], category: this.subject});
		     }
			}
	        console.log("data");
	      return Posts.find({ $or: data}, sort);
	    }
	},

	topIsSelected: function() {
		if (Session.get("filter") == "Top") return "active";
	},

	oldestIsSelected: function() {
		if (Session.get("filter") == "Oldest") return "active";
	},

	newestIsSelected: function() {
		if (Session.get("filter") == "Newest") return "active";
	},
	categories: function() {
	    return Categories.find();
	  },

	title: function(){
		if (this.subject == "all"){
			return "Instigate Change";
		}
		return this.subject;
	},

	titleraw:function(){
		return this.subject;
	}
});


Template.tab.events( {
	"click #filter li" : function(event) {
		console.log("clicked");
		Session.set("filter", event.target.id);
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
	  },

	 "change #category": function(e){
	 	Router.go("/" + document.getElementById("category").value);
	 }
});