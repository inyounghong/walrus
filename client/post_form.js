// Form for adding a post

Meteor.subscribe("posts");

Template.post_form.helpers({
	isLogged: function(){
	    return !(Meteor.userId() === null);
	},

	categories: function() {
	    return Categories.find();
	  },

	isSelected: function(){
		var post = Posts.findOne({_id: Router.current().params._id});
		return (this.name == post.category);
	},

	openSelected: function(){
		return (Posts.findOne({_id: Router.current().params._id}).status == "open");
	},
	progressSelected: function(){
		return (Posts.findOne({_id: Router.current().params._id}).status == "progress");
	},
	resolvedSelected: function(){
		return (Posts.findOne({_id: Router.current().params._id}).status == "resolved");
	},
	closedSelected: function(){
		return (Posts.findOne({_id: Router.current().params._id}).status == "closed");
	}
});

Template.post_form.events({

	"click .submit-post": function (event) {
		console.log(this._id);
		var text = document.getElementById("post-text").value;
	    var isAnon = document.getElementById("anonymous").checked;
	    var category = document.getElementById("category").value;
	    var status = document.getElementById("status").value;

	    console.log(isAnon);
	    // Require text and category
		if (isEmpty(text) || category == "Category"){
			console.log("error");
			document.getElementById("error").innerHTML = "Please enter a text and a category!";
		} 
		else {
			if (Router.current().params._id === undefined){
				// Adding a new post
				console.log("adding post");
				Meteor.call("addPost", text, category, isAnon, status, function(err, data){
					Router.go("/post/" + data);
				});
			}
			else{
				// Updating an existing post
				Meteor.call("updatePost", Router.current().params._id, text, category, isAnon, status, function(err, data){
					Router.go("/post/" + Router.current().params._id);
				});
			}
			
	    	// Redirect

		}
	    
	  },
})

function isEmpty(str) {
    return (!str || 0 === str.length);
}