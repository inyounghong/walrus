// Form for adding a post

Template.post_form.helpers({
	isLogged: function(){
	    return !(Meteor.userId() === null);
	},

	tabs: function() {
	    return Categories.find();
	  }
});

Template.post_form.events({
	"click .submit-post": function (event) {
		var text = document.getElementById("post-text").value;
	    var isAnon = document.getElementById("anonymous").value;
	    var category = document.getElementById("category").value;

	    // Require text and category
		if (isEmpty(text) || category == "Category"){
			console.log("error");
			document.getElementById("error").innerHTML = "Please enter a text and a category!";
		} 
		else {
			console.log("adding post");
			Meteor.call("addPost", text, category, isAnon);
	    	// Redirect
	    	Router.go("/");
		}
	    
	  },
})

function isEmpty(str) {
    return (!str || 0 === str.length);
}