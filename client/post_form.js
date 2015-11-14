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
	    var isAnon = document.getElementById("anonymous").checked;
	    var category = document.getElementById("category").value;

	    console.log(isAnon);
	    // Require text and category
		if (isEmpty(text) || category == "Category"){
			console.log("error");
			document.getElementById("error").innerHTML = "Please enter a text and a category!";
		} 
		else {
			console.log("adding post");
			Meteor.call("addPost", text, category, isAnon, function(err, data){
				console.log(data);
				Router.go("/post/" + data);
			});
	    	// Redirect

		}
	    
	  },
})

function isEmpty(str) {
    return (!str || 0 === str.length);
}